import React,{ReactElement} from 'react'

interface siderBarItem{
  startIcon:ReactElement,
  title:string
}

function SiderbarItem({startIcon,title}:siderBarItem) {
  return (
    <div className='bg-grey-400 p-2 m-1 rounded-sm flex items-center'><span className='mr-2'>{startIcon}</span> {title}</div>
  )
}

export default SiderbarItem