import React from 'react'
import SiderbarItem from './SiderbarItem'
import BrainIcon from '../icons/BrainIcon'
import ShareIcons from '../icons/ShareIcons'
import TweeterIcon from '../icons/TweeterIcon'
import YoutubeIcon from '../icons/YoutubeIcon'
import DocumentIcon from '../icons/DocumentIcon'
import LinkIcon from '../icons/LinkIcon'
import TagsIcon from '../icons/TagsIcon'

function Sidebar() {
  return (
    <div className=' max-w-65 min-h-screen border-r border-black p-6'>
      <div className='text-lg  flex'><span className='mr-2 text-purple-600'><BrainIcon/></span> Second Brain</div>
      <div className='mt-5'>
        <SiderbarItem title='Tweets' startIcon={<TweeterIcon />}/>
        <SiderbarItem title='Videos' startIcon={<YoutubeIcon/>}/>
        <SiderbarItem title='Documents' startIcon={<DocumentIcon />}/>
        <SiderbarItem title='Links' startIcon={<LinkIcon/>}/>
        <SiderbarItem title='Tags' startIcon={<TagsIcon/>}/>
      </div>
    </div>
  )
}

export default Sidebar