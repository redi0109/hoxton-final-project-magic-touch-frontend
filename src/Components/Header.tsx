import { AppBar, Toolbar, IconButton, Typography, Box, Stack, Button, } from "@mui/material";
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingBag';
import { Link } from "react-router-dom";
import "../App.css";
import { User } from "../types";


type Props = {
  currentUser: null | User;
};

export function Header({ currentUser }: Props) {
  return (
        <div className="header">
    <AppBar position="static" color="inherit">
        
    <Toolbar>
      <Link to={"/home"}>
        <IconButton size="large" color="error" aria-label="logo" edge="start">
          <LocalCarWashIcon />
        </IconButton>
      </Link>

      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
      <Link to={"/home"}>
        <h2>A1A CarWash</h2>
    
        </Link>
      </Typography>

      <Box px={{ xs: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={7}
        >
          <Link to={"/home"}>
            <Button color="inherit"><h2>HOME</h2></Button>
          </Link>

          <Link to={"/shop"}>
            <Button color="inherit"><h2>SHOP</h2> </Button>
          </Link>
          <Link to={"/brands"}>
            <Button color="inherit"><h2>BRANDS</h2> </Button>
          </Link>
          <Link to={"/aboutus"}>
            <Button color="inherit"><h2>ABOUT US</h2> </Button>
          </Link>
        </Stack>
      </Box>
     
      <Box px={{ xs: 4 }}>
          <Link to={currentUser ? "/cart" : "/profile"}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="logo"
            >
              <ShoppingCartCheckoutSharpIcon />
            </IconButton>
          </Link>
        </Box>
      <Box px={{ xs: 4 }}>
        <Link to="/profile">
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="logo"
          >
            <AirlineSeatReclineExtraIcon />
          </IconButton>
        </Link>
      </Box>
    </Toolbar>
  </AppBar>
  </div>
  );
}



