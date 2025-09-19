import { createTheme } from '@mui/material/styles';

// Palette de couleurs ultra-professionnelle et riche
const colors = {
    primary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e', // Vert principal
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
    },
    secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
    },
    accent: {
        50: '#fef7ff',
        100: '#fce7ff',
        200: '#f8d4fe',
        300: '#f2b5fc',
        400: '#e879f9',
        500: '#d946ef',
        600: '#c026d3',
        700: '#a21caf',
        800: '#86198f',
        900: '#701a75',
    },
    gold: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
    },
    emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
};

// Thème clair
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: colors.primary[500],
            light: colors.primary[400],
            dark: colors.primary[700],
            contrastText: '#ffffff',
        },
        secondary: {
            main: colors.secondary[600],
            light: colors.secondary[400],
            dark: colors.secondary[800],
            contrastText: '#ffffff',
        },
        background: {
            default: '#ffffff',
            paper: '#f8fafc',
        },
        text: {
            primary: colors.secondary[900],
            secondary: colors.secondary[600],
        },
        success: {
            main: colors.success,
        },
        warning: {
            main: colors.warning,
        },
        error: {
            main: colors.error,
        },
        info: {
            main: colors.info,
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 12,
                    padding: '14px 28px',
                    boxShadow: '0 4px 14px rgba(34, 197, 94, 0.15)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 8px 25px rgba(34, 197, 94, 0.25)',
                        transform: 'translateY(-2px)',
                    },
                },
                contained: {
                    background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.emerald[500]} 100%)`,
                    border: `1px solid ${colors.primary[400]}`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.emerald[600]} 100%)`,
                        boxShadow: `0 12px 35px ${colors.primary[500]}40`,
                    },
                },
                outlined: {
                    border: `2px solid ${colors.primary[500]}`,
                    color: colors.primary[600],
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.emerald[50]} 100%)`,
                        border: `2px solid ${colors.primary[600]}`,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.1)',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 20px 60px rgba(34, 197, 94, 0.15)',
                        transform: 'translateY(-8px) scale(1.02)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
                    borderBottom: '1px solid rgba(34, 197, 94, 0.1)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.9)',
                            boxShadow: '0 4px 20px rgba(34, 197, 94, 0.1)',
                        },
                        '&.Mui-focused': {
                            background: 'rgba(255, 255, 255, 0.95)',
                            boxShadow: '0 8px 30px rgba(34, 197, 94, 0.2)',
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${colors.primary[100]} 0%, ${colors.emerald[100]} 100%)`,
                    border: `1px solid ${colors.primary[200]}`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary[200]} 0%, ${colors.emerald[200]} 100%)`,
                        transform: 'translateY(-1px)',
                    },
                },
            },
        },
    },
});

// Thème sombre
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.primary[400],
            light: colors.primary[300],
            dark: colors.primary[600],
            contrastText: '#000000',
        },
        secondary: {
            main: colors.secondary[400],
            light: colors.secondary[300],
            dark: colors.secondary[600],
            contrastText: '#000000',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
        },
        success: {
            main: colors.success,
        },
        warning: {
            main: colors.warning,
        },
        error: {
            main: colors.error,
        },
        info: {
            main: colors.info,
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: '12px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)',
                    },
                },
                contained: {
                    background: `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[500]} 100%)`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 1px 20px rgba(0, 0, 0, 0.3)',
                },
            },
        },
    },
});

export default { lightTheme, darkTheme };
