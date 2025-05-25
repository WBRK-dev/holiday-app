export default function (region: string): string|null {
    switch (region.toLowerCase()) {
        case 'noord':
            return 'north';
        case 'midden':
            return 'central';
        case 'zuid':
            return 'south';
        default:
            return null;
    }
}