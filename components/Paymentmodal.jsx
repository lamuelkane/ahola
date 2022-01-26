import * as React from 'react';
import {useContext, useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import {paymentrequest} from '../Templates/tutor'



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

export default function Paymentmodal({setOpen, open, method}) {
  const handleClose = () => setOpen(false);
  const [amt, setamt] = useState(0)
  const [email, setemail] = useState('')
  const {user, sever, socket, Courses} = useSelector((state) => state);

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
            Widthdraw Funds With {method}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
          <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      {method}  email address
                      </label>
                      <input
                      required
                      value={email}
                        onChange={e => setemail(e.target.value)}
                        type="email"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
        </div>
        <div className="col-span-6 sm:col-span-3 margin-bottom">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Amount
                      </label>
                      <input
                      required
                        onChange={e => {
                            if(e.target.value > user?.currentearning) {
                                setamt(user?.currentearning)
                                return
                            }
                            setamt(parseInt(e.target.value))
                        }}
                        value={amt}
                        type="number"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
        </div>
        <Button 
        variant="contained"
        onClick={async(e) => {
            const {firstname, email: email2, type} = user
            if(!email || amt < 1){
                alert('please input your payment credentials')
                return
            }
            try{
                user.currentearning -= amt
                const {data} = await axios.post(`${sever}/api/users/payment`, {
                    payment: {
                      user: {
                        firstname,
                        email2,
                        type,
                        method
                    },
                    amt,
                    email,
                    },
                    template: paymentrequest()
                  })
                await axios.post(`${sever}/api/users/${type === 'student' ? 'student' : 'tutor'}/update`, {_id: user._id, currentearning: user.currentearning})
                alert('payment request success, you would receive an email within 24 to 48 hours on the state of your request, thanks for you patience')
                setOpen(false)
            } catch(err){
                alert(err)
            }
        }}
        >Submit Payment Request</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
