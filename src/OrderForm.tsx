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

/**
 * TODOS
 * 1. Obtain projects from parent component
 *  1a. hint: uncomment line 27 for typescript support
 * 2. Update project id on change (line 94)
 * 3. Add project names as options in the Select dropdown (line 98)
 * 4. Handle errors received from the server using an appropriate component from Material-UI (lines 60 & 62)
 */

type Props = {
  isOpen: boolean
  // projects: Project[]
  selectedOrder?: Order
  handleChange(order: Order): void
  handleClose(): void
}

const useStyles = makeStyles({
  actions: {
    marginTop: "2rem"
  }
})

export default function OrderForm({
  isOpen,
  selectedOrder,
  handleChange,
  handleClose
}: Props) {
  const classes = useStyles()

  const [projectName, setProjectName] = useState<string>("")
  const [projectId, setProjectId] = useState<string>("")
  const [offsetAmount, setOffsetAmount] = useState<number>(0)

  useEffect(() => {
    setProjectName(selectedOrder?.projectName ?? "")
    setOffsetAmount(selectedOrder?.offsetAmount ?? 0)
  }, [selectedOrder])

  const handleSubmit = useCallback(() => {
    const order = { projectId, projectName, offsetAmount }
    if (typeof selectedOrder === "undefined") {
      api.order.add(order).then(handleChange)
    } else {
      api.order.update({ ...order, _id: selectedOrder._id }).then(handleChange)
    }
    handleClose()
  }, [
    projectId,
    projectName,
    offsetAmount,
    selectedOrder,
    handleChange,
    handleClose
  ])

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
              value={projectName}
              onChange={({ target: { value } }) => {
                // TODO: call setProjectId using value as projectName to lookup projectId
                setProjectName(value as string)
              }}
            >
              {/* TODO: add project names as options using MenuItem */}
              <MenuItem value="placeholder">placeholder</MenuItem>
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
