import { StyleSheet, Text, View } from 'react-native'
import { Drawer, IconButton, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react';

const SideDrawer = () => {
    const [isDrawerOpen, setDrawperopen] = useState(false);

    const toggleDrawer = () => {
        setDrawperOpen(!isDrawerOpen);
    };

    return (
        <Box>
            <IconButton onClick={toggleDrawer} color='inherit' aria-label='menu'>
                <MenuIcon />
            </IconButton>
            <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer}>

                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                  
                </Box>

            </Drawer>
        </Box>

    )
};

export default SideDrawer

const styles = StyleSheet.create({})
