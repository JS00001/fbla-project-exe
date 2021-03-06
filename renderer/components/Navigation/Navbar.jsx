import React from 'react';
import HelpModal from '../Modals/HelpModal';
import DocumentModal from '../Modals/DocumentModal';
import IconButton from './IconButton';
import { RiSunLine } from 'react-icons/ri';
import { RiQuestionMark } from 'react-icons/ri';
import { RiFileList2Line } from 'react-icons/ri';


export default function Navbar({ updateTheme }) {
    
    const [helpModal, setHelpModal] = React.useState(false);
    const [documentsModal, setDocumentsModal] = React.useState(false);
    

    return (
        <>
            <HelpModal open={helpModal} onClose={ () => setHelpModal(false) }/>
            <DocumentModal open={documentsModal} onClose={ () => setDocumentsModal(false) }/>

            <div className='py-4 px-8 border-b-2 border-slate-100 flex justify-between dark:border-gray-800'>
                <div className='flex items-center'>
                    <img src='/fbla.png' className='w-24'/>
                    <h2 className='px-5 font-bold tracking-tighter text-gray-700 dark:text-white'>Athens Attractions</h2>
                </div>

                <div className='flex items-center'>
                    <IconButton onClick={ () => setDocumentsModal(true) } tooltip='Reports'>
                        <RiFileList2Line size={26}/>
                    </IconButton>

                    <IconButton onClick={ () => setHelpModal(true) } tooltip='Help'>
                        <RiQuestionMark size={26}/>
                    </IconButton>

                    <IconButton onClick={ () => updateTheme() } tooltip='Theme'>
                        <RiSunLine size={26}/>
                    </IconButton>

                </div>
            </div>
        </>
    )
}

