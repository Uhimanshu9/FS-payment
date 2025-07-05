import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { User } from '../components/User'

export const Dashboard = () => {
  return (
    <>
    <Appbar />
    <Balance value={1000} />
    <User />
    </>
  )
}
