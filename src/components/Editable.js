import {Text, Input, } from '@chakra-ui/react'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDetectClickOut from './useDetectClickOut';
import { useToast } from '@chakra-ui/react';
import { RiEditCircleFill } from "react-icons/ri";


export default function Editable (props){

    const { show, nodeRef, triggerRef, setShow } = useDetectClickOut(false, props.downloaded);
    const dispatch = useDispatch();
    const [edited, setEdited] = React.useState(false)
    const toast = useToast()      
        
    const InputBar = React.forwardRef((props, ref) => {

        const [text, setText] = React.useState(props.text)

        const handleChange=(e)=>{
            if(show){
                if(e.target.value !== null){
                    setText(e.target.value)
                }
                
            }
        }

        const handleEnter =(e)=>{            
            if (e.key === 'Enter'){
                if(props.show){
                    //check if the name is valid for changing
                    const ext= props.file.name.split('.')
                    const extension = ext[ext.length - 1]
                    const textExtension = text.split('.')
                    if (textExtension.length > 2){
                        toast({
                            title: `No "." is allowed except for extension.`,
                            status: 'error',
                            isClosable: true,
                          })
                    } 
                    else if (textExtension[textExtension.length - 1] !== extension){
                        toast({
                            title: `File name must have extension .${extension} which is same to the original extension.`,
                            status: 'error',
                            isClosable: true,
                          })
                    }
                    else{
                        dispatch({type: 'file/update', payload: {id: props.id, text: text}})
                        setShow(false)
                        setEdited(true)
                        toast({
                            title: `File name changed.`,
                            status: 'success',
                            isClosable: true,
                          })
                    }

                }
            }
        }
        return (
            <Input type='text' ref={props.nodeRef}  onChange={handleChange} defaultValue={props.text} onKeyUp={handleEnter} />
         );
    });

    return(
        <div>
            <div ref={triggerRef}>
                {
                    edited === true || props.downloaded === true? 
                        <div>
                            <Text mt={1} style={{fontFamily: 'Sylfaen'}} > <b>Original File Name:</b> {props.file.name}</Text>
                            {!show && (props.text !== props.file.name) &&
                                <div style={{display: 'inline-flex'}}>
                                    <Text mt={1} style={{fontFamily: 'Sylfaen'}} > <b>Edited File Name:</b> {props.text}</Text>
                                    {props.downloaded ? <></>: <RiEditCircleFill  style={{marginLeft: '3px'}} />}
                                </div>
                            } 
                        </div>
                        : !show && 
                            <div style={{display: 'inline-flex'}}>
                                <Text mt={1} style={{fontFamily: 'Sylfaen'}} ><b>File Name:</b> {props.text}</Text>
                                {props.downloaded? <></>: <RiEditCircleFill style={{marginLeft: '3px'}}/>}
                            </div>
                }
            </div>
            
            { show && !props.downloaded &&
                <InputBar {...props} show={show} file={props.file} nodeRef={nodeRef}/> 
                }
        </div>
    )
}




