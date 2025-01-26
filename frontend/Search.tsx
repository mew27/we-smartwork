import { Dialog, DialogContent, DialogTitle, Divider, Input, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from "react";

interface Search {
    open : boolean,
    onClose : () => void,
}

const Search = ({open, onClose} : Search) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [recentSearch, setRecentSearch] = useState<string[]>([])
    const [searched, setSearched] = useState<string | null>(null);

    useEffect(() => {
        const intervalId = setTimeout(() => {
            if(inputRef !== null && inputRef.current !== null) {
                console.log("inputRef different from null")
                inputRef.current.focus()
            }
        }, 0)

        return () => {clearTimeout(intervalId)}
    })

    useEffect(() => {
        const storageSearchTxt = localStorage.getItem("recentlySearched")
        
        if (storageSearchTxt !== null) {
            const storageSearch = JSON.parse(storageSearchTxt)

            if (storageSearch.length !== 0) {
                setRecentSearch(storageSearch)
            }
        }
    }, [])

    useEffect(() => {
        if (searched !== null)
            localStorage.setItem("recentlySearched", JSON.stringify(recentSearch.concat(searched)))
    }, [searched])

    return (<>
        <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>
            <Input endAdornment={<SearchOutlinedIcon />}
                   inputRef={inputRef}
                   disableUnderline
                   fullWidth
                   placeholder="Cerca nel sito..."
                   onChange={() => {setSearched(inputRef.current?.value ?? "")}}/>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
            <List>
                {recentSearch.length && !searched ? <ListSubheader>Recenti</ListSubheader> : <></>}
                {recentSearch.map((v, i) => (<React.Fragment key={i}>
                    <ListItem>
                    <ListItemText>
                        <a href="#result" color="primary"> {v}</a>
                    </ListItemText>
                    </ListItem>
                </React.Fragment>))}

            </List>
        </DialogContent>
        </Dialog>
    </>);
}

export default Search;