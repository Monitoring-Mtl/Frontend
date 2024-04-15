import { useData } from "@/contexts/DataContext";
import { useLayout } from "@/contexts/LayoutContext";
import {
  Button,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function BixiTripControlForm() {
  const prefix = "bixi-trip-control-form";
  const { bixiControlTabValue } = useLayout();
  const { arrondissements } = useData();

  return (
    bixiControlTabValue === 0 && (
      <div id={prefix} data-testid={prefix}>
        <CardContent>
          <Typography variant="h6">Départ</Typography>
          <FormControl
            fullWidth
            id={`${prefix}-depart-arrondissement`}
            data-testid={`${prefix}-depart-arrondissement`}
          >
            <InputLabel>Arrondissement</InputLabel>
            <Select
              defaultValue=""
              label="Arrondissement"
              id={`${prefix}-depart-arrondissement-select`}
              data-testid={`${prefix}-depart-arrondissement-select`}
            >
              {arrondissements.map((arrondissement, index) => (
                <MenuItem
                  key={arrondissement}
                  value={arrondissement}
                  id={`${prefix}-depart-arrondissement-item-${index}`}
                  data-testid={`${prefix}-depart-arrondissement-item-${index}`}
                >
                  {arrondissement}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            id={`${prefix}-depart-station`}
            data-testid={`${prefix}-depart-station`}
          >
            <InputLabel>Station</InputLabel>
            <Select
              defaultValue=""
              label="Nom de la station"
              id={`${prefix}-depart-station-select`}
              data-testid={`${prefix}-depart-station-select`}
            >
              <MenuItem value={10}>Station Ten</MenuItem>
              <MenuItem value={20}>Station Twenty</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6">Arrivée</Typography>
          <FormControl
            fullWidth
            id={`${prefix}-arrivee-arrondissement`}
            data-testid={`${prefix}-arrivee-arrondissement`}
          >
            <InputLabel>Arrondissement</InputLabel>
            <Select
              defaultValue=""
              label="Arrondissement"
              id={`${prefix}-arrivee-arrondissement-select`}
              data-testid={`${prefix}-arrivee-arrondissement-select`}
            >
              {arrondissements.map((arrondissement, index) => (
                <MenuItem
                  key={arrondissement}
                  value={arrondissement}
                  id={`${prefix}-arrivee-arrondissement-item-${index}`}
                  data-testid={`${prefix}-arrivee-arrondissement-item-${index}`}
                >
                  {arrondissement}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            id={`${prefix}-arrivee-station`}
            data-testid={`${prefix}-arrivee-station`}
          >
            <InputLabel>Station</InputLabel>
            <Select
              defaultValue=""
              label="Nom de la station"
              id={`${prefix}-arrivee-station-select`}
              data-testid={`${prefix}-arrivee-station-select`}
            >
              <MenuItem value={10}>Station Ten</MenuItem>
              <MenuItem value={20}>Station Twenty</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6">Plage horaire</Typography>
          <TextField
            fullWidth
            label="Date de début"
            type="date"
            id={`${prefix}-date-debut`}
            data-testid={`${prefix}-date-debut`}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Heure de début"
            type="time"
            id={`${prefix}-heure-debut`}
            data-testid={`${prefix}-heure-debut`}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Date de fin"
            type="date"
            id={`${prefix}-date-fin`}
            data-testid={`${prefix}-date-fin`}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Heure de fin"
            type="time"
            id={`${prefix}-heure-fin`}
            data-testid={`${prefix}-heure-fin`}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            fullWidth
            id={`${prefix}-analyze-button`}
            data-testid={`${prefix}-analyze-button`}
          >
            ANALYSER
          </Button>
        </CardContent>
      </div>
    )
  );
}

export default BixiTripControlForm;
