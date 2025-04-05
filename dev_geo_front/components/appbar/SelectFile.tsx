import { useSelectStore } from "@/application/stores/SelectData.store";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";

const SelectFile = ()=>{
  const {files, selectFile, selected, loadFiles} = useSelectStore()
  useEffect(()=>{
    loadFiles()
  },[])
  return(
    <FormControl sx={{ m: 1, minWidth: "12rem" }}>
        <InputLabel id="demo-simple-select-autowidth-label"> Data Load</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selected}
          onChange={(e)=>selectFile(e.target.value)}
         autoWidth
        >
           <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {files.map((file)=>(
            <MenuItem key={file.filename} value={file.filename}>{file.filename}</MenuItem>
          ))}
         
          
        </Select>
      </FormControl>
  )
}

export default SelectFile;