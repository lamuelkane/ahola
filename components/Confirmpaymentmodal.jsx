import * as React from 'react';
import {useContext, useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import {paymentconfirmed} from '../Templates/tutor'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Confirmpaymentmodal({setOpen, open, file, payment}) {
  const handleClose = () => setOpen(false);
  const [amt, setamt] = useState(0)
  const [email, setemail] = useState('')
  const {sever, sever2} = useSelector((state) => state);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {payment.paid? 'Paid' :'Confirm payment'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
          <div className="col-span-6 sm:col-span-3 margin-bottom">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                     Screenshot preview
                      </label>
                     { file && <img src={payment.paid ? file : URL.createObjectURL(file)} style={{height: '200px', width: '300px'}} alt="screenshot" />}
        </div>
      {!payment.paid && 
       <Button 
        variant="contained"
        onClick={async(e) => {
            if(!file.name){
                alert('please make sure your upload an image')
                return
            }
            try {
            var bodyFormData = new FormData();
            bodyFormData.append('file', file); 
            const {data} = await axios({
                method: "post",
                url: `${sever2}/upload`,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            payment.paid = true
            payment.user.image = `${sever2}/image/${data.filename}`
            await axios.post(`${sever}/api/users/payment/update`, {payment, template: paymentconfirmed(payment.user.firstname, payment.amt, payment.user.method, payment.email, `${sever2}/image/${data.filename}`)})
            alert('paid successfully')
            setOpen(false)
            } catch (error) {
                alert(error)
            }
        }}
        >Confirm Payment</Button>}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
