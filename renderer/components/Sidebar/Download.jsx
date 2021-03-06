import React from 'react';
import fetch from 'node-fetch';
import Store from 'electron-store';
import RateModal from '../Modals/RateModal';
import DownloadModal from '../Modals/DownloadModal';
import { Button, Loading } from '@nextui-org/react';

export default function Download({ data }) {
	const [url, setUrl] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	/* Modals Open/Closed */
	const [downloadModal, setDownloadModal] = React.useState(false);
	const [rateLimitModal, setRateLimitModal] = React.useState(false);

	/* Download Data as a PDF */
	const download = () => {
		setLoading(true);

		let config = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ data }),
		};

		fetch('https://static.jsenyitko.tech/pdf', config).then(async (res) => {
			if (res.ok) {
				const store = new Store();
				const document = await res.text();
				setUrl(document);
				setLoading(false);
				setDownloadModal(true);

				const storeDocument = {
					document: document,
					date: new Date().toLocaleString([], { timeStyle: 'short' }),
					pdfstring: document.split('/').slice(-1),
				};

				if (store.get('documents'))
					store.set('documents', [storeDocument, ...store.get('documents')]);
				else store.set('documents', [storeDocument]);
			} else {
				setLoading(false);
				setRateLimitModal(true);
			}
		});
	};

	return (
		<>
			<DownloadModal open={downloadModal} onClose={() => setDownloadModal(false)} url={url} />
			<RateModal open={rateLimitModal} onClose={() => setRateLimitModal(false)} />

			<Button css={{ width: '100%' }} onClick={download} disabled={loading}>
				{loading && <Loading color='white' size='sm' />}
				{!loading && 'Export Locations'}
			</Button>
		</>
	);
}
