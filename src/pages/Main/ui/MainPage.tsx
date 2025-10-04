import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { findAllShortBids, createBid, findBidByUuid, updateBid } from '../../../features/CreateBid/api/index.ts';
import type { BidShort, BidsResponse } from '../../../features/CreateBid/const/types.ts';
import { CreateBidModal } from '../../../features/CreateBid/ui/CreateBidModal.tsx';
import { message } from 'antd';

export const MainPage = () => {
  const [bids, setBids] = useState<BidsResponse>({ items: [], total: 0, page: 1, limit: 10 });
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState<string>('');
  const [editData, setEditData] = useState<BidShort | null>(null);
  const [form, setForm] = useState<Record<string, string | string[]>>({
    paymentNumber: '', user: '', sum: '', currency: '', purpose: '', tin: '', rcr: '', senderName: '', senderAccount: '', recipientName: '', recipientDetails: '', recipientCountry: '', recipientAddress: '', recipientAccount: '', recipientNationality: '', recipientResidenceCountry: '', bankCountry: '', directorName: '', directorNationality: '', bank: '', bankAddress: '', bic: '', vat: '', description: '', status: '', date: '', time: '', creator_id: '', assigned_id: '', documents: []
  });
  const [fileList, setFileList] = useState<File[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenCreate = () => {
    setForm({
      paymentNumber: '', user: '', sum: '', currency: '', purpose: '', tin: '', rcr: '', senderName: '', senderAccount: '', recipientName: '', recipientDetails: '', recipientCountry: '', recipientAddress: '', recipientAccount: '', recipientNationality: '', recipientResidenceCountry: '', bankCountry: '', directorName: '', directorNationality: '', bank: '', bankAddress: '', bic: '', vat: '', description: '', status: '', date: '', time: '', creator_id: '', assigned_id: '', documents: []
    });
    setFileList([]);
    setOpenCreate(true);
  };

  const handleCreate = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'documents') return;
      if (value !== '') formData.append(key, value as string);
    });
    fileList.forEach(file => formData.append('documents', file));
    await createBid(formData);
    setOpenCreate(false);
  };

  const handleGetBids = async (newPage = page, newLimit = limit) => {
    const res = await findAllShortBids(String(newPage), String(newLimit));
    setBids(res);
    setTotal(res.total || 0);
    setPage(Number(res.page) || newPage);
    setLimit(Number(res.limit) || newLimit);
  };

  const handleOpenEdit = async () => {
    if (!editId) return;
    const data = await findBidByUuid(editId);
    setEditData(data);
    setForm(data);
    setOpenEdit(true);
  };

  const handleEdit = async () => {
    await updateBid(editId, form);
    setOpenEdit(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" onClick={() => handleGetBids()}>Получить заявки</Button>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ ml: 2 }} onClick={handleOpenCreate}>Создать заявку</Button>

      <CreateBidModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={async (formData) => {
          await createBid(formData);
          message.success('Заявка создана!');
          setOpenCreate(false);
          handleGetBids();
        }}
      />

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md" fullWidth>
        <DialogTitle>Редактировать заявку</DialogTitle>
        <DialogContent>
          {editData ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {Object.keys(form).map(key => (
                key !== 'documents' ? (
                  <TextField key={key} name={key} label={key} value={form[key] ?? ''} onChange={handleChange} />
                ) : null
              ))}
            </Box>
          ) : 'Загрузка...'}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Отмена</Button>
          <Button onClick={handleEdit} variant="contained">Сохранить</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 3 }}>
        {bids && bids.items.length > 0 && (
          <>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Сумма</TableCell>
                    <TableCell>Валюта</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Получатель</TableCell>
                    <TableCell>Страна получателя</TableCell>
                    <TableCell>Назначение</TableCell>
                    <TableCell>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bids.items.map((bid: BidShort) => (
                    <TableRow key={bid.id}>
                      <TableCell>{bid.id}</TableCell>
                      <TableCell>{bid.amount}</TableCell>
                      <TableCell>{bid.currency}</TableCell>
                      <TableCell>{bid.status}</TableCell>
                      <TableCell>{bid.recipient_name}</TableCell>
                      <TableCell>{bid.recipient_country}</TableCell>
                      <TableCell>{bid.purpose}</TableCell>
                      <TableCell>
                        <IconButton color="primary" size="small" onClick={() => { setEditId(bid.id); handleOpenEdit(); }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={Math.ceil(total / limit)}
                page={page}
                onChange={(_, value) => handleGetBids(value, limit)}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MainPage;