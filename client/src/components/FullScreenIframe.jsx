import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { Maximize, Minimize } from 'lucide-react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenIframe({open,setOpen,url}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar className='bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-row justify-end'>
            <IconButton onClick={handleClose}>
                <Minimize className='text-white'/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className='w-full h-full overflow-y-auto'>
            {
                url && <iframe src={url} width={'100%'} height={'100%'}/>
            }
        </div>
      </Dialog>
    </React.Fragment>
  );
}
