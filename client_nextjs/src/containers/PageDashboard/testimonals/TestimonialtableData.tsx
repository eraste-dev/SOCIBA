import React, { FC, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "components/Button/Button";
import { EyeIcon, TrashIcon, XIcon } from "@heroicons/react/solid";
import {
  ITestimonial,
  TestimonalAction,
} from "app/reducer/testimonials/testimonial";
import SingleTestimonialDetail from "./SingleTestimonialDetail";
import Avatar from "components/Avatar/Avatar";
import { CheckIcon } from "@heroicons/react/outline";
import { saveTestimonial } from "app/axios/actions/api.testimony";
import { useAppSelector } from "app/hooks";
import { useSnackbar } from "notistack";

export interface ColumnTable {
  id: "id" | "name" | "message" | "validated" | "date" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface TestimonialtableDataProps {
  rows: ITestimonial[];
}

const TestimonialtableData: FC<TestimonialtableDataProps> = ({ rows }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [rowSelected, setRowSelected]: any = React.useState(null);
  const [open, setopen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const success = useAppSelector(TestimonalAction.success);
  const loading = useAppSelector(TestimonalAction.loading);

  const snackbar = useSnackbar();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const activeTestimony = (row: ITestimonial) => {
    const payload: ITestimonial = {
      ...row,
      validated: !row.validated,
      user_id: row.user?.id ?? 0,
    };
    dispatch(saveTestimonial(payload));
  };

  const deleteTestimony = (row: ITestimonial) => {
    const payload: ITestimonial = {
      ...row,
      validated: false,
      user_id: row.user?.id ?? 0,
    };
    // dispatch(saveTestimonial(payload))
  };

  const shortMessage = (message: string) => {
    if (!message) return "";

    if (message.length > 100) {
      return message.substring(0, 100) + "...";
    }
    return message;
  };

  const columns: ColumnTable[] = [
    { id: "id", label: "id", minWidth: 100 },
    { id: "name", label: "Utilisateur", minWidth: 100 },
    { id: "message", label: "Message", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  if (!columns && !rows) {
    return null;
  }

  useEffect(() => {
    if (!loading && success) {
      snackbar.enqueueSnackbar("Testimony validated", {
        variant: "success",
      });
    }
  }, [loading, success, snackbar]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ minHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="bg-gray-500">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const { id, user, message, created_at, validated } = row;
                return (
                  <React.Fragment key={id}>
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex justify-start align-middle ">
                          {user && user.avatar ? (
                            <Avatar
                              sizeClass="h-10 w-10 text-base"
                              containerClassName="flex-shrink-0 mr-4"
                              radius="rounded-full"
                              imgUrl={user.avatar}
                              userName={`${user.name} ${user.last_name}`}
                            />
                          ) : null}
                          {user ? `${user.name} ${user.last_name}` : ""}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: shortMessage(message) ?? "",
                          }}
                        />
                      </TableCell>
                      <TableCell>{created_at}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setRowSelected(row);
                            setopen(true);
                          }}
                        >
                          <EyeIcon
                            color="primary"
                            height={25}
                            width={25}
                            className="cursor-pointer text-primary-700 "
                          />
                        </Button>

                        <Button
                          onClick={() => {
                            activeTestimony(row);
                          }}
                        >
                          {validated ? (
                            <XIcon
                              color="secondary"
                              height={25}
                              width={25}
                              className="cursor-pointer text-primary-700"
                            />
                          ) : (
                            <CheckIcon
                              color="secondary"
                              height={25}
                              width={25}
                              className="cursor-pointer text-primary-700"
                            />
                          )}
                        </Button>

                        {false && (
                          <Button
                            onClick={() => {
                              deleteTestimony(row);
                            }}
                          >
                            <TrashIcon
                              color="secondary"
                              height={25}
                              width={25}
                              className="cursor-pointer text-primary-700 "
                            />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <SingleTestimonialDetail
        open={open}
        handleClose={() => setopen(false)}
        row={rowSelected}
      />
    </Paper>
  );
};

export default TestimonialtableData;
