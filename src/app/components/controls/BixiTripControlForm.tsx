import { useData } from "@/contexts/DataContext";
import { useLayout } from "@/contexts/LayoutContext";
import { StationLocation } from "@/types/bixiTypes";
import {
  Button,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function BixiTripControlForm() {
  const prefix = "bixi-trip-control-form";
  const { bixiControlTabValue } = useLayout();
  const {
    bixiTripControlBoroughs,
    bixiTripControlStartBoroughSelect,
    setBixiTripControlStartBoroughSelect,
    bixiTripControlEndBoroughSelect,
    setBixiTripControlEndBoroughSelect,
    bixiTripControlStartStationSelect,
    setBixiTripControlStartStationSelect,
    bixiTripControlEndStationSelect,
    setBixiTripControlEndStationSelect,
  } = useData();

  const [startStations, setStartStations] = useState<{}>([]);
  const [endStations, setEndStations] = useState<{}>([]);

  const handleArrondissementChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: SelectChangeEvent<string>) => {
      const arrondissement = event.target.value;
      setter(arrondissement);
    };

  const handleStationChange =
    (
      setter: React.Dispatch<React.SetStateAction<StationLocation>>,
      stations: {}
    ) =>
    (event: SelectChangeEvent<string>) => {
      const stationLocationName = event.target.value;
      setter(stations[stationLocationName]);
    };

  const fetchStations = (
    arrondissement: string,
    setStations: React.Dispatch<
      React.SetStateAction<{ [key: string]: StationLocation }>
    >
  ) => {
    if (!arrondissement) return;

    fetch(
      `/api/bixi/stations?arrondissement=${encodeURIComponent(arrondissement)}`
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stations");
        }
        const data: StationLocation[] = await response.json();
        const stationDict = data.reduce((acc, station) => {
          if (station.name) acc[station.name] = station;
          return acc;
        }, {} as { [key: string]: StationLocation });
        setStations(stationDict);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        setStations({});
      });
  };

  useEffect(() => {
    fetchStations(bixiTripControlStartBoroughSelect, setStartStations);
  }, [bixiTripControlStartBoroughSelect, setStartStations]);

  useEffect(() => {
    fetchStations(bixiTripControlEndBoroughSelect, setEndStations);
  }, [bixiTripControlEndBoroughSelect, setEndStations]);

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
              value={bixiTripControlStartBoroughSelect}
              onChange={handleArrondissementChange(
                setBixiTripControlStartBoroughSelect
              )}
              id={`${prefix}-depart-arrondissement-select`}
              data-testid={`${prefix}-depart-arrondissement-select`}
            >
              {bixiTripControlBoroughs.map((arrondissement, index) => (
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
              value={bixiTripControlStartStationSelect.name}
              onChange={handleStationChange(
                setBixiTripControlStartStationSelect,
                startStations
              )}
              id={`${prefix}-depart-station-select`}
              data-testid={`${prefix}-depart-station-select`}
            >
              {Object.keys(startStations).map((stationName, index) => (
                <MenuItem
                  key={stationName}
                  value={stationName}
                  id={`${prefix}-depart-station-item-${index}`}
                  data-testid={`${prefix}-depart-station-item-${index}`}
                >
                  {stationName}
                </MenuItem>
              ))}
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
              value={bixiTripControlEndBoroughSelect}
              onChange={handleArrondissementChange(
                setBixiTripControlEndBoroughSelect
              )}
              id={`${prefix}-arrivee-arrondissement-select`}
              data-testid={`${prefix}-arrivee-arrondissement-select`}
            >
              {bixiTripControlBoroughs.map((arrondissement, index) => (
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
              value={bixiTripControlEndStationSelect.name}
              onChange={handleStationChange(
                setBixiTripControlEndStationSelect,
                endStations
              )}
              id={`${prefix}-arrivee-station-select`}
              data-testid={`${prefix}-arrivee-station-select`}
            >
              {Object.keys(endStations).map((stationName, index) => (
                <MenuItem
                  key={stationName}
                  value={stationName}
                  id={`${prefix}-arrivee-station-item-${index}`}
                  data-testid={`${prefix}-arrivee-station-item-${index}`}
                >
                  {stationName}
                </MenuItem>
              ))}
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
