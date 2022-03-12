
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import React from "react";
import { gql, useMutation, useQuery } from '@apollo/client';
import { UPSERT_NOTES } from '../constants/graphql/test/mutations'

import { NoteList } from './NoteList';

export const Home = () => {

  const intialState = {
    title: "",
    content: "",
    id: null,
  };
  const [form, setForm] = React.useState(intialState);
  const [refetch, setFetch] = React.useState(false);

  const [upsertNotes] = useMutation(UPSERT_NOTES);

  const handleSubit = async (data) => {

    const payload = data;

    if(form.id){
      payload.id = form.id
    }

    try {
      upsertNotes({
        variables: payload,
      })
        .then(resp => {
          setForm(intialState)
          setFetch(!refetch)
          console.log("resp", resp)
        })
        .catch(error => {
          console.log("error", error)
        });

    } catch (error) {
      console.log(error)
    }
  }

  const getForEdit = (data)=>{
    setForm((p)=>({...p, title: data.title, content: data.content, id: data.id}))
  }

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-center font-bold text-2xl mt-4">Notes</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubit(form)
          }}
          className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
        >
          <input
            type="text"
            placeholder="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-2 rounded border-gray-600 p-1"
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="border-2 rounded border-gray-600 p-1"
          />
          <button type="submit" className="bg-blue-500 text-white rounded p-1">
           {form.id ? "Update" :"Add"}
          </button>
        </form>
      </div>
      <NoteList refetch={refetch} forEdit={getForEdit}/>
    </div>
  )
}
