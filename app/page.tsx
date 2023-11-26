import Image from 'next/image'
import styles from './page.module.css'
import useLoginStatus from '../hooks/useLoginStatus'

export default function Home() {
    const { } = useLoginStatus
    return (
        <div>This is a documentation system</div>
    )
}
