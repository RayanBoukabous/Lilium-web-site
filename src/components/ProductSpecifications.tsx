import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Divider,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore,
  Science,
  LocalPharmacy,
  Security,
  Info,
  CheckCircle,
  Warning,
  Download,
} from '@mui/icons-material';

interface ProductSpecificationsProps {
  productName: string;
  specifications?: {
    composition?: string[];
    dosage?: string;
    indications?: string[];
    contraindications?: string[];
    sideEffects?: string[];
    storage?: string;
    manufacturer?: string;
    batchNumber?: string;
    expiryDate?: string;
  };
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  productName,
  specifications = {},
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>('composition');

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const defaultSpecs = {
    composition: [
      'Ingrédients actifs de haute qualité pharmaceutique',
      'Excipients conformes aux standards internationaux',
      'Sans conservateurs artificiels',
      'Sans colorants synthétiques',
    ],
    dosage: '1 à 2 gélules par jour, de préférence le matin avec un grand verre d\'eau',
    indications: [
      'Complément alimentaire pour adultes',
      'Soutien nutritionnel quotidien',
      'Maintien de l\'équilibre de l\'organisme',
    ],
    contraindications: [
      'Femmes enceintes et allaitantes',
      'Enfants de moins de 12 ans',
      'Personnes allergiques aux composants',
    ],
    sideEffects: [
      'Aucun effet secondaire connu aux doses recommandées',
      'En cas de réaction allergique, arrêter immédiatement',
    ],
    storage: 'Conserver dans un endroit sec et frais, à l\'abri de la lumière',
    manufacturer: 'Lilium Pharma - Laboratoire certifié GMP',
    batchNumber: 'LOT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
  };

  const specs = { ...defaultSpecs, ...specifications };

  const specificationSections = [
    {
      id: 'composition',
      title: 'Composition',
      icon: <Science />,
      color: theme.palette.primary.main,
      content: (
        <Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            Formule scientifiquement développée avec des ingrédients de haute qualité.
          </Typography>
          <Grid container spacing={1}>
            {specs.composition?.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ color: theme.palette.success.main, fontSize: '1rem' }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ),
    },
    {
      id: 'usage',
      title: 'Mode d\'emploi',
      icon: <LocalPharmacy />,
      color: theme.palette.info.main,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Dosage recommandé
          </Typography>
          <Typography variant="body1" paragraph>
            {specs.dosage}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Indications
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {specs.indications?.map((indication, index) => (
              <Chip
                key={index}
                label={indication}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>
      ),
    },
    {
      id: 'safety',
      title: 'Sécurité',
      icon: <Security />,
      color: theme.palette.warning.main,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.warning.main }}>
            Contre-indications
          </Typography>
          <Box sx={{ mb: 3 }}>
            {specs.contraindications?.map((contraindication, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Warning sx={{ color: theme.palette.warning.main, fontSize: '1rem' }} />
                <Typography variant="body2">{contraindication}</Typography>
              </Box>
            ))}
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Effets secondaires
          </Typography>
          {specs.sideEffects?.map((effect, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Info sx={{ color: theme.palette.info.main, fontSize: '1rem' }} />
              <Typography variant="body2">{effect}</Typography>
            </Box>
          ))}
        </Box>
      ),
    },
    {
      id: 'storage',
      title: 'Conservation',
      icon: <Info />,
      color: theme.palette.secondary.main,
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            {specs.storage}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Fabricant
              </Typography>
              <Typography variant="body2">
                {specs.manufacturer}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Numéro de lot
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                {specs.batchNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Date d'expiration
              </Typography>
              <Typography variant="body2">
                {specs.expiryDate}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ),
    },
  ];

  return (
    <Card
      sx={{
        background: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Spécifications Techniques
            </Typography>
            <Tooltip title="Télécharger la notice">
              <IconButton
                sx={{
                  background: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Informations détaillées sur {productName}
          </Typography>
        </Box>

        <Box>
          {specificationSections.map((section) => (
            <Accordion
              key={section.id}
              expanded={expanded === section.id}
              onChange={handleChange(section.id)}
              sx={{
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                },
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                '&:last-child': {
                  borderBottom: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  px: 3,
                  py: 2,
                  '&.Mui-expanded': {
                    minHeight: 'auto',
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                    '&.Mui-expanded': {
                      margin: 0,
                    },
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '50%',
                      background: alpha(section.color, 0.1),
                      color: section.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {section.title}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                {section.content}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductSpecifications;
