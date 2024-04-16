import { useData } from "@/contexts/DataContext";
import { useLayout } from "@/contexts/LayoutContext";
import { StationLocation, defaultBixiStation } from "@/types/bixiTypes";
import { toEpochMillis } from "@/utils/datetime-utils";
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
  const noSelection = "No selection";
  const { bixiControlTabValue } = useLayout();
  const {
    bixiTripControlBoroughs,
    bixiTripControlStartBorough,
    setBixiTripControlStartBorough,
    bixiTripControlEndBorough,
    setBixiTripControlEndBorough,
    bixiTripControlStartStation,
    setBixiTripControlStartStation,
    bixiTripControlEndStation,
    setBixiTripControlEndStation,
    bixiTripControlStartDate,
    setBixiTripControlStartDate,
    bixiTripControlEndDate,
    setBixiTripControlEndDate,
    bixiTripControlStartTime,
    setBixiTripControlStartTime,
    bixiTripControlEndTime,
    setBixiTripControlEndTime,
  } = useData();
  const [startStations, setStartStations] = useState<{}>([]);
  const [endStations, setEndStations] = useState<{}>([]);
  const isAnalyzeDisabled =
    !bixiTripControlStartDate || !bixiTripControlEndDate;

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
      if (stationLocationName) setter(stations[stationLocationName]);
      else setter(stations[noSelection]);
    };

  function handleAnalyserClick() {
    const startEpochMillis = toEpochMillis(
      bixiTripControlStartDate,
      bixiTripControlStartTime || undefined
    );
    const endEpochMillis = toEpochMillis(
      bixiTripControlEndDate,
      bixiTripControlEndTime || undefined
    );

    const query = new URLSearchParams();

    if (bixiTripControlStartStation?.name) {
      query.append("startStationName", bixiTripControlStartStation.name);
    }
    if (bixiTripControlEndStation?.name) {
      query.append("endStationName", bixiTripControlEndStation.name);
    }
    if (startEpochMillis) {
      query.append("minStartTime", startEpochMillis.toString());
    }
    if (endEpochMillis) {
      query.append("maxStartTime", endEpochMillis.toString());
    }

    fetch(`/api/bixi/trips/duration/average?${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
        stationDict[noSelection] = defaultBixiStation;
        setStations(stationDict);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        setStations({});
      });
  };

  useEffect(() => {
    fetchStations(bixiTripControlStartBorough, setStartStations);
  }, [bixiTripControlStartBorough, setStartStations]);

  useEffect(() => {
    fetchStations(bixiTripControlEndBorough, setEndStations);
  }, [bixiTripControlEndBorough, setEndStations]);

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
              value={bixiTripControlStartBorough}
              onChange={handleArrondissementChange(
                setBixiTripControlStartBorough
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
              value={bixiTripControlStartStation.name}
              onChange={handleStationChange(
                setBixiTripControlStartStation,
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
              value={bixiTripControlEndBorough}
              onChange={handleArrondissementChange(
                setBixiTripControlEndBorough
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
              value={bixiTripControlEndStation.name}
              onChange={handleStationChange(
                setBixiTripControlEndStation,
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
            value={bixiTripControlStartDate}
            onChange={(e) => setBixiTripControlStartDate(e.target.value)}
            id={`${prefix}-date-debut`}
            data-testid={`${prefix}-date-debut`}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Heure de début"
            type="time"
            value={bixiTripControlStartTime}
            onChange={(e) => setBixiTripControlStartTime(e.target.value)}
            id={`${prefix}-heure-debut`}
            data-testid={`${prefix}-heure-debut`}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Date de fin"
            type="date"
            value={bixiTripControlEndDate}
            onChange={(e) => setBixiTripControlEndDate(e.target.value)}
            id={`${prefix}-date-fin`}
            data-testid={`${prefix}-date-fin`}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Heure de fin"
            type="time"
            value={bixiTripControlEndTime}
            onChange={(e) => setBixiTripControlEndTime(e.target.value)}
            id={`${prefix}-heure-fin`}
            data-testid={`${prefix}-heure-fin`}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleAnalyserClick}
            id={`${prefix}-analyze-button`}
            data-testid={`${prefix}-analyze-button`}
            disabled={isAnalyzeDisabled}
          >
            ANALYSER
          </Button>
        </CardContent>
      </div>
    )
  );
}

export default BixiTripControlForm;
