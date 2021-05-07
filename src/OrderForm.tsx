import { useCallback, useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/styles"

import api from "./api"
import { Order, Project } from "../common/types"

type Props = {
  isOpen: boolean
  projects: Project[]
  selectedOrder?: Order
  handleChange(order: Order): void
  handleClose(): void
}

const useStyles = makeStyles({
  actions: {
    marginTop: "2rem"
  }
})

function isValid({ name, offsetAmount }: Partial<Order>): boolean {
  return name !== "" && offsetAmount !== 0
}

export default function OrderForm({
  isOpen,
  projects,
  selectedOrder,
  handleChange,
  handleClose
}: Props) {
  const classes = useStyles()

  const [name, setName] = useState<string>("")
  const [offsetAmount, setOffsetAmount] = useState<number>(0)

  useEffect(() => {
    setName(selectedOrder?.name ?? "")
    setOffsetAmount(selectedOrder?.offsetAmount ?? 0)
  }, [selectedOrder])

  const handleSubmit = useCallback(() => {
    const order = { name, offsetAmount }
    if (isValid(order)) {
      if (typeof selectedOrder === "undefined") {
        api.order.add(order).then(handleChange)
      } else {
        api.order
          .update({ ...order, _id: selectedOrder._id })
          .then(handleChange)
      }
    }
    handleClose()
  }, [name, offsetAmount, selectedOrder, handleChange, handleClose])

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputLabel id="name-label">Name</InputLabel>
            <Select
              margin="dense"
              id="name"
              labelId="name-label"
              fullWidth
              value={name}
              onChange={({ target: { value } }) => setName(value as string)}
            >
              {projects.map(({ _id, name }) => (
                <MenuItem key={_id} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="offsetAmount"
              label="Offset Amount"
              type="number"
              fullWidth
              value={offsetAmount}
              onChange={({ target: { value } }) =>
                setOffsetAmount(parseFloat(value))
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={handleClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
