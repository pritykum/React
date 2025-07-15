import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import { PrimeReactContext } from 'primereact/api';
import { Dropdown } from "primereact/dropdown";
import { InputSwitch, type InputSwitchChangeEvent } from "primereact/inputswitch";

interface LookAndFeelSidebarProps {
    side: 'left' | 'right';
}

const LookAndFeelSidebar: React.FC<LookAndFeelSidebarProps> = ({side}) => {

    // Sidebar visibility
    const [lookAndFeelSidebarVisible, setLookAndFeelSidebarVisible] = useState<boolean>(false);

    // Current theme path
    const storedPath = localStorage.getItem('app-theme-path') || 'nokia-light';
    const [currentPath, setCurrentPath] = useState(storedPath);

    // Selected theme
    const [selectedTheme, setSelectedTheme] = useState(null);

    // Dark mode
    const [darkMode, setDarkMode] = useState<boolean>(false);

    // List of available themes
    const [themeList] = useState(
        {
            'Bootstrap4 Blue': {
                'light': 'bootstrap4-light-blue',
                'dark': 'bootstrap4-dark-blue',
            },
            'Bootstrap4 Purple': {
                'light': 'bootstrap4-light-purple',
                'dark': 'bootstrap4-dark-purple',
            },
            'Lara Amber': {
                'light': 'lara-light-amber',
                'dark': 'lara-dark-amber',
            },
            'Lara Blue': {
                'light': 'lara-light-blue',
                'dark': 'lara-dark-blue',
            },
            'Lara Green': {
                'light': 'lara-light-green',
                'dark': 'lara-dark-green',
            },
            'Lara Pink': {
                'light': 'lara-light-pink',
                'dark': 'lara-dark-pink',
            },
            'Lara Teal': {
                'light': 'lara-light-teal',
                'dark': 'lara-dark-teal',
            },
            'Nokia': {
                'light': 'nokia-light',
                'dark': 'nokia-dark'
            },
            'MD Indigo': {
                'light': 'md-light-indigo',
                'dark': 'md-dark-indigo'
            },
            'MDC Deep Purple': {
                'light': 'mdc-light-deeppurple',
                'dark': 'mdc-dark-deeppurple'
            },
            'Soho': {
                'light': 'soho-light',
                'dark': 'soho-dark',
            },
            'Viva': {
                'light': 'viva-light',
                'dark': 'viva-dark',
            },
        }
    );

    const themeOptions = Object.keys(themeList);

    // Get the changeTheme function from PrimeReactContext
    const { changeTheme } = React.useContext(PrimeReactContext);

    // Load initial theme from localStorage or system preference on mount
    // 
   useEffect(() => {
  const stored = localStorage.getItem('app-theme-path') || 'nokia-light';

  if (!changeTheme) {
    console.error("PrimeReact changeTheme function not available.");
    return;
  }

  if (stored !== currentPath) {
    changeTheme(`themes/${currentPath}/theme.css`, `themes/${stored}/theme.css`, 'theme-link', () => {
      setCurrentPath(stored);
    });
  } else {
    // Ensure theme is applied even if stored === currentPath
    changeTheme(`themes/${stored}/theme.css`, `themes/${stored}/theme.css`, 'theme-link', () => {});
  }
}, [changeTheme]);



    
    const applyTheme = () => {

        if (selectedTheme === null) {
            console.warn("No theme selected. Cannot apply theme.");
            return;
        }

        if (!changeTheme) {
            console.error("PrimeReact changeTheme function is not available. Ensure PrimeReactProvider is used.");
            return;
        }

        const newPath = themeList[selectedTheme][darkMode ? "dark" : "light"];
        changeTheme(`themes/${currentPath}/theme.css`, `themes/${newPath}/theme.css`, 'theme-link', () => {
            setCurrentPath(newPath);
        });
        localStorage.setItem('app-theme-path', newPath);

    };

    return (
        <>
            <Sidebar visible={lookAndFeelSidebarVisible} position={side} onHide={() => setLookAndFeelSidebarVisible(false)} className="w-full md:w-20rem lg:w-30rem">
                <h2>.:: L&F Definitions ::.</h2>
                <p className="text-lg mb-4">
                    Current Theme: <span className="font-semibold">{currentPath}</span>
                </p>
                <div className="p-inputgroup flex-1 mb-3">
                    <Dropdown
                        value={selectedTheme}
                        onChange={(e) => setSelectedTheme(e.value)}
                        options={themeOptions}
                        placeholder="select a theme"
                        className="w-full"
                        filter
                    />
                    <Button
                        label="Apply"
                        icon="pi pi-check"
                        onClick={applyTheme}
                        disabled={selectedTheme === null}
                        iconPos="left"
                        className="p-button-primary md:w-9rem lg:w-9rem"
                    />
                </div>
                <div className="card flex align-items-center justify-content-center gap-3">
                    <i className="pi pi-sun"></i>Light Mode
                    <InputSwitch checked={darkMode} onChange={(e: InputSwitchChangeEvent) => setDarkMode(e.value)} />
                    Dark Mode<i className="pi pi-moon"></i>
                </div>
            </Sidebar>
            <div className="card flex justify-content-end">
                <Button
                    className="m-2"
                    style={{ width: '2rem', height: '2rem', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setLookAndFeelSidebarVisible(true)}
                    tooltip="Expand Look and Feel sidebar"
                    tooltipOptions={{ position: side === 'left' ? 'right' : 'left' }}
                >
                    <i className="pi pi-palette" style={{ fontSize: '1.2rem' }}></i>
                </Button>
            </div>
        </>
    );
}

export default LookAndFeelSidebar;