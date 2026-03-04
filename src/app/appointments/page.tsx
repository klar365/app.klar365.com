import AppointmentList from "@/components/organisms/AppointmentList";
import { Text } from "@mantine/core";

function Page() {
    return (
        <>
            <Text size="xl" component="h1">
                Appointments
            </Text>

            <ol className="p-2 flex flex-col gap-2">
                <AppointmentList />
            </ol>
        </>
    );
}

export default Page;