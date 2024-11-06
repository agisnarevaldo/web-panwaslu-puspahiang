'use client';

import {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle, CheckCircle, Printer, XCircle} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import formatDate from "@/lib/formatDate";
import {Button} from "@/components/ui/button";

interface PPTPS {
    id: number;
    namaLengkap: string;
    nik: string;
    status: string;
    tempatLahir: string;
    TanggaLahir: string;
}

export default function TabelPPTPS() {
    const [pptpsData, setPPTPSData] = useState<PPTPS[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPPTPSData();
    }, []);

    const fetchPPTPSData = async () => {
        try {
            const response = await fetch('/api/pptps');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPPTPSData(data.data);
            console.log(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching PPTPS data:', error);
            setError('Failed to fetch data. please try again later');
            setLoading(false);
        }
    }

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            const response = await fetch(`/api/pptps/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status: newStatus}),
            })

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            // update the status in the local state
            setPPTPSData(prevData =>
                prevData.map(item =>
                    item.id === id ? {...item, status: newStatus} : item
                )
            )
        } catch (error) {
            console.error('Error updating status:', error);
            setError('Failed to update status. Please try again later');
        }
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank')
        if (printWindow) {
            printWindow.document.write(`
        <html>
          <head>
            <title>PPTPS Table</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .print-header { text-align: center; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="print-header">
              <h1>PPTPS Table</h1>
              <p>Printed on: ${new Date().toLocaleString()}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Nama Lengkap</th>
                  <th>NIK</th>
                  <th>Tanggal Lahir</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${pptpsData.map(pptps => `
                  <tr>
                    <td>${pptps.namaLengkap}</td>
                    <td>${pptps.nik}</td>
                    <td>${formatDate(pptps.TanggaLahir)}</td>
                    <td>${pptps.status}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `)
            printWindow.document.close()
            printWindow.print()
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4 px-8">
                <h2 className="text-2xl font-bold">Tabel Pendaftar PTPS</h2>
                <Button
                    onClick={handlePrint}
                    size='sm'
                    variant='secondary'
                >
                    <Printer className="h-4 w-4 mr-2"/>
                    Print Tabel
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>NIK</TableHead>
                        <TableHead>Tempat Lahir</TableHead>
                        <TableHead>Tanggal Lahir</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pptpsData.map((pptps) => (
                        <TableRow key={pptps.id}>
                            <TableCell>{pptps.namaLengkap}</TableCell>
                            <TableCell>{pptps.nik}</TableCell>
                            <TableCell>{pptps.tempatLahir}</TableCell>
                            <TableCell>{formatDate(pptps.TanggaLahir)}</TableCell>
                            <TableCell>{pptps.status}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        size='sm'
                                        onClick={() => handleStatusChange(pptps.id, 'accepted')}
                                        disabled={pptps.status !== 'PENDING'}
                                        className="bg-green-500 text-white hover:bg-green-600 font-semibold"
                                    >
                                        <CheckCircle className="h-4 w-4"/>
                                        {" "}Acc
                                    </Button>
                                    <Button
                                        size='sm'
                                        onClick={() => handleStatusChange(pptps.id, 'rejected')}
                                        disabled={pptps.status !== 'PENDING'}
                                        variant='destructive'
                                    >
                                        <XCircle className="h-4 w-4 font-semibold"/>
                                        {" "}Reject
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}