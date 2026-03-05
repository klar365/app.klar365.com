function formatVehicleLabel(plateNumber: string, name: string | null) {
    return name
        ? `${name} (${plateNumber})`
        : plateNumber;
}

export default formatVehicleLabel;