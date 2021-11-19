import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LayersIcon from '@material-ui/icons/Layers';
import GridViewIcon from '@material-ui/icons/GridView';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './ResponsiveDrawer.css'
import { Outlet } from 'react-router-dom'

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
				<ListItem component="a" button key={'新闻管理'}>
					<ListItemIcon>
						<LibraryBooksIcon />
					</ListItemIcon>
					<ListItemText primary={'新闻管理'} />
				</ListItem>
				<ListItem component="a" button key={'影片管理'}>
					<ListItemIcon>
						<LayersIcon />
					</ListItemIcon>
					<ListItemText primary={'影片管理'} />
				</ListItem>
				<ListItem component="a" button key={'影片分类'}>
					<ListItemIcon>
						<GridViewIcon />
					</ListItemIcon>
					<ListItemText primary={'影片分类'} />
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

			<Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
				<Outlet></Outlet>
			</Box>

		</Box>
	);
}

export default ResponsiveDrawer;