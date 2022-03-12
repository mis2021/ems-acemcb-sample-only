import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { DELETE_NOTE } from '../constants/graphql/test/mutations';
import { GET_NOTE_LIST } from "../constants/graphql/test/queries"
export const NoteList = (props) => {
    const { loading: noteListLoading, data: noteList, refetch } = useQuery(GET_NOTE_LIST);

    useEffect(() => {
        refetch()
    }, [props.refetch])


    const sendForEdit = (data) => {
        props.forEdit(data)
    }

    const [deleteNotes] = useMutation(DELETE_NOTE);

    const sendDelete = (id) => {
        deleteNotes({
            variables: {
                id: id
            },
        })
            .then(resp => {
                refetch()
            })
            .catch(error => {
                console.log("error", error)
            });
    }

    return (
        <div>
            {
                noteList?.notes.map((i) => (
                    <li>
                        <span onClick={e => sendForEdit(i)} style={{ cursor: 'pointer' }}>{i.title}-{i.content} </span>
                        -
                        <span onClick={e => sendDelete(i.id)} style={{ cursor: 'pointer' }}>Delete</span>
                    </li>
                ))
            }

        </div>
    )
}
