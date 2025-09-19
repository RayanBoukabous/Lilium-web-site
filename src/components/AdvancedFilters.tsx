import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Filter,
  Search,
  X,
  ChevronDown,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  MapPin,
  DollarSign,
  Star,
  Clock,
  Zap,
  Brain,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

interface FilterState {
  search: string;
  priceRange: [number, number];
  countries: number[];
  categories: string[];
  sortBy: 'relevance' | 'price' | 'rating' | 'newest' | 'popularity';
  availability: 'all' | 'inStock' | 'lowStock';
  features: string[];
  aiEnabled: boolean;
  personalized: boolean;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  onFiltersChange,
  onClose,
  isOpen = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: [0, 5000],
    countries: [],
    categories: [],
    sortBy: 'relevance',
    availability: 'all',
    features: [],
    aiEnabled: true,
    personalized: true,
  });

  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Catégories de produits
  const categories = [
    { id: 'fertility', name: 'Fertilité', icon: '💖', color: '#ef4444' },
    { id: 'vitamins', name: 'Vitamines', icon: '⭐', color: '#f97316' },
    { id: 'minerals', name: 'Minéraux', icon: '🏆', color: '#eab308' },
    { id: 'immune', name: 'Immunité', icon: '🛡️', color: '#22c55e' },
    { id: 'cognitive', name: 'Cognitive', icon: '🧠', color: '#0ea5e9' },
    { id: 'bone', name: 'Os & Articulations', icon: '🦴', color: '#8b5cf6' },
    { id: 'vision', name: 'Vision', icon: '👁️', color: '#ec4899' },
  ];

  // Pays disponibles
  const countries = [
    { id: 1, name: 'Algérie', flag: '🇩🇿' },
    { id: 2, name: 'Tunisie', flag: '🇹🇳' },
    { id: 3, name: 'Maroc', flag: '🇲🇦' },
  ];

  // Fonctionnalités avancées
  const features = [
    { id: 'organic', name: 'Bio', icon: '🌱' },
    { id: 'premium', name: 'Premium', icon: '💎' },
    { id: 'fast-acting', name: 'Action Rapide', icon: '⚡' },
    { id: 'long-lasting', name: 'Effet Durable', icon: '⏰' },
    { id: 'natural', name: 'Naturel', icon: '🍃' },
    { id: 'certified', name: 'Certifié', icon: '✅' },
  ];

  // Simulation d'analyse IA
  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    
    // Simulation du traitement IA
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const suggestions = [
      'Produits similaires à vos favoris',
      'Tendances de cette semaine',
      'Compléments recommandés',
      'Meilleures offres du moment',
    ];
    
    setAiSuggestions(suggestions);
    setIsAnalyzing(false);
  };

  // Gestion des changements de filtres
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Reset des filtres
  const resetFilters = () => {
    const defaultFilters: FilterState = {
      search: '',
      priceRange: [0, 5000],
      countries: [],
      categories: [],
      sortBy: 'relevance',
      availability: 'all',
      features: [],
      aiEnabled: true,
      personalized: true,
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  // Appliquer les suggestions IA
  const applyAISuggestion = (suggestion: string) => {
    // Simulation de l'application des suggestions
    console.log('Applying AI suggestion:', suggestion);
  };

  useEffect(() => {
    if (filters.aiEnabled) {
      analyzeWithAI();
    }
  }, [filters.aiEnabled]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          sx={{
            position: isMobile ? 'fixed' : 'relative',
            top: isMobile ? 0 : 'auto',
            left: isMobile ? 0 : 'auto',
            right: isMobile ? 0 : 'auto',
            bottom: isMobile ? 0 : 'auto',
            zIndex: isMobile ? 1300 : 'auto',
            height: isMobile ? '100vh' : 'auto',
            overflow: 'auto',
            borderRadius: isMobile ? 0 : 2,
            p: 3,
            width: isMobile ? '100%' : 400,
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Filter size={20} color={theme.palette.primary.main} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Filtres Avancés
              </Typography>
            </Box>
            {onClose && (
              <IconButton onClick={onClose} size="small">
                <X size={20} />
              </IconButton>
            )}
          </Box>

          {/* Recherche IA */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ChevronDown size={16} />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Brain size={16} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Recherche Intelligente
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Recherche avec IA..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={16} />
                      </InputAdornment>
                    ),
                    endAdornment: filters.search && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => updateFilter('search', '')}>
                          <X size={16} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={filters.aiEnabled}
                      onChange={(e) => updateFilter('aiEnabled', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="IA Activée"
                />

                {filters.aiEnabled && (
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<Sparkles size={16} />}
                      onClick={analyzeWithAI}
                      disabled={isAnalyzing}
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      {isAnalyzing ? 'Analyse en cours...' : 'Analyser avec IA'}
                    </Button>

                    {isAnalyzing && (
                      <Box sx={{ textAlign: 'center', py: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Notre IA analyse vos préférences...
                        </Typography>
                      </Box>
                    )}

                    {aiSuggestions.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                          Suggestions IA :
                        </Typography>
                        <Stack spacing={1}>
                          {aiSuggestions.map((suggestion, index) => (
                            <Chip
                              key={index}
                              label={suggestion}
                              size="small"
                              onClick={() => applyAISuggestion(suggestion)}
                              sx={{
                                justifyContent: 'flex-start',
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: theme.palette.primary.light,
                                },
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Box>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Prix */}
          <Accordion>
            <AccordionSummary expandIcon={<ChevronDown size={16} />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DollarSign size={16} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Prix
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ px: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                </Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(_, newValue) => updateFilter('priceRange', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  step={50}
                  valueLabelFormat={(value) => formatPrice(value)}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Pays */}
          <Accordion>
            <AccordionSummary expandIcon={<ChevronDown size={16} />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MapPin size={16} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Pays
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                {countries.map((country) => (
                  <FormControlLabel
                    key={country.id}
                    control={
                      <Switch
                        checked={filters.countries.includes(country.id)}
                        onChange={(e) => {
                          const newCountries = e.target.checked
                            ? [...filters.countries, country.id]
                            : filters.countries.filter(id => id !== country.id);
                          updateFilter('countries', newCountries);
                        }}
                        size="small"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{country.flag}</span>
                        <Typography variant="body2">{country.name}</Typography>
                      </Box>
                    }
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Catégories */}
          <Accordion>
            <AccordionSummary expandIcon={<ChevronDown size={16} />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Target size={16} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Catégories
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                {categories.map((category) => (
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Switch
                        checked={filters.categories.includes(category.id)}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...filters.categories, category.id]
                            : filters.categories.filter(id => id !== category.id);
                          updateFilter('categories', newCategories);
                        }}
                        size="small"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{category.icon}</span>
                        <Typography variant="body2">{category.name}</Typography>
                      </Box>
                    }
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Fonctionnalités */}
          <Accordion>
            <AccordionSummary expandIcon={<ChevronDown size={16} />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Zap size={16} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Fonctionnalités
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {features.map((feature) => (
                  <Chip
                    key={feature.id}
                    label={`${feature.icon} ${feature.name}`}
                    size="small"
                    variant={filters.features.includes(feature.id) ? 'filled' : 'outlined'}
                    onClick={() => {
                      const newFeatures = filters.features.includes(feature.id)
                        ? filters.features.filter(id => id !== feature.id)
                        : [...filters.features, feature.id];
                      updateFilter('features', newFeatures);
                    }}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                      },
                    }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Tri */}
          <Accordion>
            <AccordionSummary expandIcon={<ChevronDown size={16} />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp size={16} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Trier par
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <Select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  size="small"
                >
                  <MenuItem value="relevance">Pertinence IA</MenuItem>
                  <MenuItem value="price">Prix</MenuItem>
                  <MenuItem value="rating">Note</MenuItem>
                  <MenuItem value="newest">Plus récent</MenuItem>
                  <MenuItem value="popularity">Popularité</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* Options avancées */}
          <Accordion>
            <AccordionSummary expandIcon={<ChevronDown size={16} />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Award size={16} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Options Avancées
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={filters.personalized}
                      onChange={(e) => updateFilter('personalized', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Recommandations personnalisées"
                />
                
                <FormControl fullWidth>
                  <InputLabel>Disponibilité</InputLabel>
                  <Select
                    value={filters.availability}
                    onChange={(e) => updateFilter('availability', e.target.value)}
                    size="small"
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    <MenuItem value="inStock">En stock</MenuItem>
                    <MenuItem value="lowStock">Stock faible</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Divider sx={{ my: 3 }} />

          {/* Actions */}
          <Stack spacing={2}>
            <Button
              variant="contained"
              startIcon={<Filter size={16} />}
              fullWidth
              onClick={() => onFiltersChange(filters)}
            >
              Appliquer les filtres
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<RefreshCw size={16} />}
              fullWidth
              onClick={resetFilters}
            >
              Réinitialiser
            </Button>
          </Stack>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
};

// Fonction utilitaire pour formater les prix
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

export default AdvancedFilters;


