import Image from 'next/image'
import styles from './page.module.css'
import useLoginStatus from '../hooks/useLoginStatus'
import { Container } from '@mui/material'

export default function Home() {
    return (
        <Container>
            <div>This is a documentation system</div>
        </Container>
    )
}
