import communeGeoJson from '@/assets/maps/communes.json';
import proviceGeoJson from '@/assets/maps/provinces.json';
import { useMemRegion } from '@/components/SessionContext';
import { Region } from '@/types/holiday';
import * as turf from '@turf/turf';
import * as Location from 'expo-location';

export default async function (): Promise<Region> {
    const { memRegion } = useMemRegion();
    if (memRegion)
        return memRegion;

    const location = await getLocation();
    if (!location)
        return 'noord';

    const province = getPropsFromTurf(proviceGeoJson, location);
    const commune = getPropsFromTurf(communeGeoJson, location);
    if (!province || !commune)
        return 'noord';

    const dataProvice = provinces[province.toLowerCase()];
    if (!dataProvice)
        return 'noord';

    if (dataProvice.entirely)
        return dataProvice.region as Region;

    const dataCommuneKeys = Object.keys(communes[province.toLowerCase()]);
    for (const key of dataCommuneKeys) {
        if (communes[province.toLowerCase()][key]?.find(s => s === commune.toLowerCase())) {
            return key as Region;
        }
    }

    return dataProvice.region as Region;
}

async function getLocation() {
    if (!await usePermissions())
        return null;

    return await Location.getCurrentPositionAsync({});
}

async function usePermissions() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
}

function getPropsFromTurf(geoJson: any, location: Location.LocationObject): string | null {
    const point = turf.point([location.coords.longitude, location.coords.latitude]);

    for (const feature of geoJson.features) {
        if (feature.geometry.type !== 'Polygon' && feature.geometry.type !== 'MultiPolygon')
            continue;

        let polygon;
        let inside = false;
        if (feature.geometry.type === 'Polygon') {
            polygon = turf.polygon(feature.geometry.coordinates);
            inside = turf.booleanPointInPolygon(point, polygon);
        } else {
            polygon = turf.multiPolygon(feature.geometry.coordinates);
            inside = turf.booleanPointInPolygon(point, polygon);
        } 

        if (inside) {
            return feature.properties.statnaam;
        }
    }

    return null;
}

const provinces: { [key: string]: { region: string, entirely: Boolean} } = {
    'flevoland': { region: 'noord', entirely: false },
    'drenthe': { region: 'noord', entirely: true },
    'groningen': { region: 'noord', entirely: true },
    'friesland': { region: 'noord', entirely: true },
    'overijssel': { region: 'noord', entirely: true },
    'noord-holland': { region: 'noord', entirely: true },
    
    'gelderland': { region: 'midden', entirely: false },
    'utrecht': { region: 'midden', entirely: false },
    'zuid-holland': { region: 'midden', entirely: true },

    'zeeland': { region: 'zuid', entirely: true },
    'noord-brabant': { region: 'zuid', entirely: false },
    'limburg': { region: 'zuid', entirely: true },
}

const communes: { [key: string]: { [key: string]: string[] } } = {
    'flevoland': { 'midden': ['zeewolde'], },
    'gelderland': { 'noord': ['hattem'], 'zuid': ['arnhem', 'berg en dal', 'beuningen', 'doesburg', 'druten', 'duiven', 'heumen', 'neder-betuwe', 'lingewaard', 'maasdriel', 'montferland', 'nijmegen', 'overbetuwe', 'renkum', 'rheden', 'rozendaal', 'rijnwaarden', 'westervoort', 'west maas en waal', 'wijchen', 'zaltbommel', 'zevenaar'], },
    'utrecht': { 'noord': ['eemnes'], },
    'noord-brabant': { 'midden': ['altena'], },
}