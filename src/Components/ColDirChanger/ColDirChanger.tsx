import React from 'react'

const ChildDirChanger = (props:{condition?:boolean,children?:any}) => {

  return (
    <>
    {(props?.condition||false)? [...(props?.children||[])]?.reverse?.():props?.children}
    </>
  )
}

export default ChildDirChanger