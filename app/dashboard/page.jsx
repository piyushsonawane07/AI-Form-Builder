import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

function Page() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl text-primary flex items-center justify-between'>Dashboard
      <CreateForm/>
      </h2>
      <FormList/>
    </div>
  )
}

export default Page