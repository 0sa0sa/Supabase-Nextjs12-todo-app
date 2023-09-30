import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Notice, Task } from '../types/types'
import { supabase } from '../utils/supabase'

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from<Task>('todos')
        .select('*')
        .order('created_at', { ascending: true })
      setTasks(tasks ?? [])
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from<Notice>('notices')
        .select('*')
        .order('created_at', { ascending: true })
      setNotices(notices ?? [])
    }
    getTasks()
    getNotices()
  }, [])

  return (
    <Layout title="CSR">
      <p className="mb-3 text-blue-500">SSG + CSF</p>
      <ul className="mb-3">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          )
        })}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Csr
