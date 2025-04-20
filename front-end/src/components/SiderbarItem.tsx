import React,{ReactElement} from 'react'

interface siderBarItem{
  startIcon:ReactElement,
  title:string
}

function SiderbarItem({startIcon,title}:siderBarItem) {
  return (
    <div className='bg-grey-400 hover:bg-slate-200 transition duration-600 p-3 m-1 rounded-sm flex items-center'><span className='mr-3 text-slate-600'>{startIcon}</span> {title}</div>
  )
}

export default SiderbarItem