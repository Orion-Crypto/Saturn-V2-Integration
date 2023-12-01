import { Navbar } from '@/components/Layouts/Navbar';
import { Metadata } from 'next';
import './globals.css';
import Provider from './provider';

export const metadata: Metadata = {
    title: 'Saturn | Cardano Integration Library',
    description: 'Saturn Integration library allows you to integrate the Saturn APIs seamlessly into your application!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div>
                        <Navbar />
                        <div>{children}</div>
                    </div>
                </Provider>
            </body>
        </html>
    );
}
