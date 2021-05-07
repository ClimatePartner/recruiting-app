import { useCallback, useEffect, useMemo, useState } from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { makeStyles } from "@material-ui/styles"

import api from "./api"
import OrderForm from "./OrderForm"
import { Order, Project } from "../common/types"

const useStyles = makeStyles({
  app: {
    padding: "2rem",
    height: "100vh",
    width: "100%"
  },
  container: {
    marginBottom: "6rem"
  },
  heading: {
    marginBottom: "2rem"
  },
  icon: {
    cursor: "pointer"
  },
  iconCell: {
    paddingLeft: 0,
    paddingRight: 0,
    width: "3rem"
  },
  thead: {
    fontWeight: 700
  }
})

export default function App() {
  const classes = useStyles()
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [orders, setOrders] = useState<Record<string, Order>>({})
  const [selectedOrder, setSelectedOrder] = useState<Order>()
  const [projects, setProjects] = useState<Project[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  )

  const handleChange = useCallback(
    (order: Order) => {
      if (typeof orders[order._id] === "undefined") {
        setOrders({ ...orders, order })
      } else {
        setOrders({ ...orders, [order._id]: order })
      }
    },
    [orders, setOrders]
  )

  const handleClickOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setSelectedOrder(undefined)
  }, [])

  const handleEdit = useCallback(
    (_id: string) => {
      setSelectedOrder(orders[_id])
      setIsOpen(true)
    },
    [orders, setSelectedOrder]
  )

  const handleDelete = useCallback((_id: string) => {
    api.order.delete(_id).then(setOrders)
  }, [])

  useEffect(() => {
    api.order.fetch().then(setOrders)
    api.project.fetch().then(setProjects)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.app}>
        <Grid container className={classes.container}>
          <Grid item xs={11}>
            <Typography className={classes.heading} variant="h4">
              Orders
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
            >
              Add Order
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.thead}>#</TableCell>
                    <TableCell className={classes.thead}>Project</TableCell>
                    <TableCell className={classes.thead}>
                      Offset Amount (kg)
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(orders).map(
                    ({ _id, name, offsetAmount }, index) => (
                      <TableRow key={_id} hover={true}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{offsetAmount}</TableCell>
                        <TableCell className={classes.iconCell}>
                          <EditIcon
                            className={classes.icon}
                            color="primary"
                            onClick={() => handleEdit(_id)}
                          />
                        </TableCell>
                        <TableCell className={classes.iconCell}>
                          <DeleteIcon
                            className={classes.icon}
                            color="secondary"
                            onClick={() => handleDelete(_id)}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Typography className={classes.heading} variant="h4">
              Projects
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.thead}>Name</TableCell>
                    <TableCell className={classes.thead}>Country</TableCell>
                    <TableCell className={classes.thead}>Technology</TableCell>
                    <TableCell className={classes.thead}>
                      Available Offset Amount (kg)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(projects).map(
                    ({ _id, name, country, offsetAmount, technology }) => (
                      <TableRow key={_id} hover={true}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{country}</TableCell>
                        <TableCell>{technology}</TableCell>
                        <TableCell>{offsetAmount}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <OrderForm
          isOpen={isOpen}
          projects={projects}
          selectedOrder={selectedOrder}
          handleChange={handleChange}
          handleClose={handleClose}
        />
      </Paper>
    </ThemeProvider>
  )
}
