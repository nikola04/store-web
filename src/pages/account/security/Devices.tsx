import Section from "../../../components/account/Section";
import Loader from "../../../components/loader";
import { useDevices } from "../../../hooks/useDevices"

export default function AccountDevices(){
    const { devices, loading } = useDevices();
    console.log(devices);
    return <div className="flex flex-col">
        <Section title="My Devices">
            { loading && <Loader size='s'/> }
            { !loading && null }
        </Section>
    </div>
}
