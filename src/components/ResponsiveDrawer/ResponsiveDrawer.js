import React from 'react'
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LayersIcon from '@mui/icons-material/Layers';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './ResponsiveDrawer.css'
import { Outlet } from 'react-router-dom'
import GridViewIcon from '@mui/icons-material/GridView';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const nav = (
		<div>
			<Toolbar className="toolbar-title">
				<Typography variant="h6">欢迎</Typography>
			</Toolbar>
			<Divider />
			<List>
				<ListItem href="/#/news" component="a" button key={'新闻管理'}>
					<ListItemIcon>
						<LibraryBooksIcon />
					</ListItemIcon>
					<ListItemText primary={'新闻管理'} />
				</ListItem>
				<ListItem href="/#/movie-manage" component="a" button key={'影片管理'}>
					<ListItemIcon>
						<LayersIcon />
					</ListItemIcon>
					<ListItemText primary={'影片管理'} />
				</ListItem>
				<ListItem href="/#/movie-classify" component="a" button key={'类别管理'}>
					<ListItemIcon>
						<GridViewIcon />
					</ListItemIcon>
					<ListItemText primary={'类别管理'} />
				</ListItem>
				<ListItem href="/#/upload" component="a" button key={'影片上传'} >
					<ListItemIcon>
						<CloudUploadIcon />
					</ListItemIcon>
					<ListItemText primary={'影片上传'} />
				</ListItem>
			</List>
		</div>
	)

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar className="title-bar">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						电影管理
					</Typography>
					<IconButton className="user-icon" href="/#/user">
						<AccountCircleIcon></AccountCircleIcon>
					</IconButton>
				</Toolbar>
			</AppBar>

			<Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{nav}
				</Drawer>
				<Drawer variant="permanent" open
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{nav}
				</Drawer>
			</Box>

			<Box component="main" sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				flexGrow: 1, p: 3,
				width: { sm: `calc(100% - ${drawerWidth}px)` },
			}}>
				<Outlet></Outlet>
			</Box>

		</Box>
	);
}

export default ResponsiveDrawer;