import * as React from "react"
import { useState } from "react"
import { motion, SyncLayout } from "@framer"

/**
 * Issues:
 * - Nested stuff
 * - Animating between borderRadius value type
 */

const transition = { duration: 3, ease: "linear" }

interface ListProps {
    list: number[]
    onItemClick: (id: number) => void
    backgroundColor: string
}

const List = ({ id, list, onItemClick, backgroundColor }: ListProps) => {
    return (
        <motion.ul auto autoId={id} style={styles.list}>
            {list.map(id => (
                <motion.li
                    auto
                    style={{ ...styles.item, backgroundColor }}
                    key={id}
                    autoId={id}
                    id={"list-" + id}
                    onClick={() => onItemClick(id)}
                    drag
                />
            ))}
        </motion.ul>
    )
}

export const App = () => {
    // const [listA, setListA] = useState([0, 1, 2, 3, 4, 5, 6])
    // const [listB, setListB] = useState([7, 8, 9, 10, 11, 12])

    const [lists, setLists] = useState([[0], [1]])

    return (
        <SyncLayout>
            <div style={styles.container}>
                <List
                    list={lists[0]}
                    onItemClick={id => moveItem(id, 1, lists, setLists)}
                    backgroundColor="red"
                    id="listA"
                />
                <List
                    list={lists[1]}
                    onItemClick={id => moveItem(id, 0, lists, setLists)}
                    backgroundColor="blue"
                    id="listB"
                />
            </div>
        </SyncLayout>
    )
}

const styles = {
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    list: {
        width: 350,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "white",
        display: "flex",
        listStyle: "none",
        flexDirection: "column",
    },
    item: {
        height: 50,
        width: 330,
        borderRadius: 5,
        margin: 10,
    },
}

function moveItem(
    id: number,
    targetListId: number,
    [a, b]: number[][],
    setLists: (lists: number[][]) => void
): void {
    const targetList = targetListId === 0 ? a : b
    const originList = targetListId === 0 ? b : a

    const newOriginList = [...originList]
    const originIndex = newOriginList.indexOf(id)
    newOriginList.splice(originIndex, 1)

    const newTargetList = [...targetList]
    newTargetList.splice(0, 0, id)

    setLists(
        targetListId === 0
            ? [newTargetList, newOriginList]
            : [newOriginList, newTargetList]
    )
}