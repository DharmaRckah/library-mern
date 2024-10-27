import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

function Logout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true); // Modal open state

  const handleClose = () => {
    setOpen(false);
    // Clear session storage
    sessionStorage.removeItem("dauth");
    // Redirect to the home page
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    // If you want to auto close after a certain time, you can add this
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // Closes after 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  return (
    <Dialog open={open} onClose={handleClose}>
      
      <DialogContent>
        <div className='bg-gradient-to-r from-red-500 to-blue-500 via-orange-500 via-yellow-500 to-blue bg-clip-text text-transparent text-3xl font-bold'>
        𝚃𝚑𝚊𝚗𝚔 𝚢𝚘𝚞 𝚏𝚘𝚛 𝚟𝚒𝚜𝚒𝚝𝚒𝚗𝚐 𝚂𝚠𝚊𝚖𝚒 𝚅𝚒𝚟𝚎𝚔𝚊𝚗𝚊𝚗𝚍𝚊 𝙻𝚒𝚋𝚛𝚊𝚛𝚢! 𝚆𝚎 𝚑𝚘𝚙𝚎 𝚢𝚘𝚞 𝚎𝚗𝚓𝚘𝚢𝚎𝚍 𝚢𝚘𝚞𝚛 𝚝𝚒𝚖𝚎 𝚠𝚒𝚝𝚑 𝚞𝚜 𝚊𝚗𝚍 𝚏𝚘𝚞𝚗𝚍 𝚝𝚑𝚎 𝚛𝚎𝚜𝚘𝚞𝚛𝚌𝚎𝚜 𝚑𝚎𝚕𝚙𝚏𝚞𝚕. 𝙲𝚘𝚖𝚎 𝚋𝚊𝚌𝚔 𝚜𝚘𝚘𝚗!        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Logout;
