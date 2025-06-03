import { FC } from "react";
import Employee from "../model/Employee";
import { useForm } from "react-hook-form";
import {
  Box,
  Flex,
  Field,
  NativeSelect,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import { departments } from "../../config/departments.json";
import { age, salary } from "../../config/ranges.json";
import { getDateFromAge } from "../utils/functions";
interface Props {
  submitter: (empl: Employee) => void;
}

function getMinMaxDates(): { min: string; max: string } {
  return { min: getDateFromAge(age.max), max: getDateFromAge(age.min) };
}
const EmployeeForm: FC<Props> = ({ submitter }) => {
  const {
    register,
    // reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Employee>();
  return (
    <Box
      display="flex"
      flexDirection="column"
      as="form"
      onSubmit={handleSubmit((empl) =>
        submitter({ ...empl, salary: +empl.salary })
      )}
    >
      <Flex
        flexDirection={{
          base: "column",
          sm: "row",
        }}
      >
        <Field.Root invalid={!!errors.department}>
          <Field.Label>Department</Field.Label>
          <NativeSelect.Root
            size="sm"
            width={{
              base: "80vw",
              sm: "20vw",
            }}
          >
            <NativeSelect.Field
              placeholder="Select option"
              {...register("department", { required: true })}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>Department must be selected</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.fullName}>
          <Field.Label>Full Name</Field.Label>

          <Input
            size="sm"
            width={{
              base: "80vw",
              sm: "20vw",
            }}
            placeholder="Full Name"
            {...register("fullName", { required: true })}
          />
          <Field.ErrorText>Full name must be entered</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.birthDate}>
          <Field.Label>Birthdate</Field.Label>

          <Input
            size="sm"
            width={{
              base: "80vw",
              sm: "20vw",
            }}
            type="date"
            placeholder="Birthdate"
            {...register("birthDate", { required: true, ...getMinMaxDates() })}
            min={getDateFromAge(age.max)}
            max={getDateFromAge(age.min)}
          />

          <Field.ErrorText>Birthdate must be selected</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.salary}>
          <Field.Label>Salary</Field.Label>

          <Input
            size="sm"
            width={{
              base: "80vw",
              sm: "20vw",
            }}
            type="number"
            placeholder="Salary"
            {...register("salary", {
              required: true,
              min: salary.min,
              max: salary.max,
            })}
          />

          <Field.ErrorText>
            Salary must be inputted in the range{" "}
            {`[${salary.min}-${salary.max}]`}
          </Field.ErrorText>
        </Field.Root>
      </Flex>
      <HStack>
        <Button type="submit">Save</Button>
        <Button type="reset">Reset</Button>
      </HStack>
    </Box>
  );
};

export default EmployeeForm;
