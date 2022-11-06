import {
  Center,
  chakra,
  Checkbox,
  CheckboxGroup,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from 'src/components/landing/Jobs/Card';
import Data from 'src/components/landing/Jobs/Data.json';
import Layout from 'src/components/landing/Jobs/Layout';
import Pagination from 'src/components/Pagination/Pagination';
import { IFilter } from '@/interfaces/filter.interface';
import { IJob } from '@/interfaces/job/job.interface';
import { useFilter } from 'src/lib/hooks/useFilter';

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<IJob[]>(Data);
  const [sliderValue1, setSliderValue1] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const [sliderValue2, setSliderValue2] = useState(5);
  const [filters, setFilters] = useState<IFilter[]>([]);

  const { ref, inView, entry } = useInView({
    threshold: 0.4,
  });

  const PageSize = 6;

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const arr = filteredData.slice(firstPageIndex, lastPageIndex);
    return arr;
  }, [currentPage, filteredData]);

  const setReqFilter = (filter: IFilter) => {
    let existingFilters = filters;
    let req_filter = existingFilters.filter(
      (item) => item.filter_type !== filter.filter_type
    );
    req_filter.push(filter);
    setFilters(req_filter);
  };
  useEffect(() => {
    let newArray = useFilter({
      all_filters: filters,
      fullArray: Data,
    });
    setFilteredData(newArray);
    setCurrentPage(1);
  }, [filters]);
  return (
    <Layout data={filteredData} setData={setReqFilter}>
      <Stack
        ref={ref}
        mx="auto"
        maxW="fit-content"
        direction={'row'}
        gap="1.5rem"
        p="1rem"
      >
        <Stack>
          <Stack spacing={'2rem'} minW="15rem" direction={'column'} p="1rem">
            <Stack direction={'column'}>
              <Heading fontWeight="600" fontSize="xl">
                Job Type
              </Heading>
              <CheckboxGroup
                onChange={(checked_fields: string[]) => {
                  setReqFilter({
                    filter_type: 'job_type',
                    filter_values: checked_fields,
                  });
                }}
              >
                <Stack direction={'column'} p="1rem">
                  <Checkbox value="1" size={'md'}>
                    Full Time Job
                  </Checkbox>
                  <Checkbox value="2" size={'md'}>
                    Part Time Job
                  </Checkbox>
                  <Checkbox value="3" size={'md'}>
                    Freelance Job
                  </Checkbox>
                  <Checkbox value="4" size={'md'}>
                    Remote Job
                  </Checkbox>
                  <Checkbox value="5" size={'md'}>
                    Internship
                  </Checkbox>
                </Stack>{' '}
              </CheckboxGroup>
            </Stack>
            <Stack gap="1rem">
              <Heading fontWeight="600" fontSize="xl">
                Salary
              </Heading>
              <RangeSlider
                aria-label={['0', '300']}
                max={300}
                id="slider"
                colorScheme="blue"
                onChangeEnd={(val) => {
                  let props = {
                    filter_type: 'job_salary_max',
                    filter_values: ['1'],
                    compare: { min: val[0], max: val[1] },
                  };
                  //console.log(val);
                  setReqFilter(props);
                  setSliderValue1(val[0]);
                  setSliderValue2(val[1]);
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <RangeSliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
                  0k
                </RangeSliderMark>
                <RangeSliderMark value={300} mt="1" ml="-2.5" fontSize="sm">
                  300k
                </RangeSliderMark>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <Tooltip
                  hasArrow
                  bg="blue.500"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`${sliderValue1}k`}
                >
                  <RangeSliderThumb index={0} />
                </Tooltip>
                <Tooltip
                  hasArrow
                  bg="blue.500"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`${sliderValue2}k`}
                >
                  <RangeSliderThumb index={1} />
                </Tooltip>
              </RangeSlider>
            </Stack>
            <Stack direction={'column'}>
              {' '}
              <Heading fontWeight="600" fontSize="xl">
                Experience
              </Heading>
              <CheckboxGroup
                onChange={(checked_fields: string[]) => {
                  setReqFilter({
                    filter_type: 'job_experience_level',
                    filter_values: checked_fields,
                  });
                }}
              >
                <Stack direction={'column'} p="1rem">
                  <Checkbox value="1">Entry Level</Checkbox>
                  <Checkbox value="2">Intermediate Level</Checkbox>
                  <Checkbox value="3">Senior Level</Checkbox>
                </Stack>
              </CheckboxGroup>
            </Stack>
          </Stack>
        </Stack>
        <Center
          minW="42rem"
          gap="1.3rem"
          p="1rem"
          w="fit-content"
          flexDirection="column"
        >
          <Stack
            fontWeight="400"
            direction={'row'}
            justifyContent="space-between"
            w="100%"
          >
            <Text color="gray.400">Showing {filteredData.length} results</Text>
            <Stack direction={'row'}>
              <Text color="gray.400">Sort by :</Text>
              <chakra.select
                defaultValue="1"
                bg="white"
                name="cars"
                id="cars"
                onChange={(event: { target: { value: any } }) => {
                  setReqFilter({
                    filter_type: 'created_at',
                    filter_values: ['1'],
                    sort:
                      event.target.value === '1' ? 'increasing' : 'decreasing',
                  });
                }}
              >
                <option value="1">Newest First</option>
                <option value="2">Oldest First</option>
                {/* <option value="3">Most Popular</option> */}
              </chakra.select>
            </Stack>
          </Stack>
          {currentData.length === 0 ? (
            <Center
              textAlign={'center'}
              flexDirection={'column'}
              w="100%"
              maxW="3xl"
              h="100%"
            >
              <Heading
                mb="2rem"
                rounded="full"
                bg="gray.100"
                p="1rem 1.5rem"
                fontSize="6xl"
              >
                🫣
              </Heading>
              <Text maxW="14rem" fontSize="xl">
                Sorry We could not find any match for that.
              </Text>
              <Text color={'gray.400'}>Try something else</Text>
            </Center>
          ) : (
            currentData.map((item, index) => <Card key={index} {...item} />)
          )}
          <Pagination
            onPageChange={(page: number) => {
              setCurrentPage(page);
            }}
            siblingCount={4}
            currentPage={currentPage}
            totalCount={filteredData.length}
            pageSize={PageSize}
          />
        </Center>
      </Stack>
    </Layout>
  );
};

export default Jobs;
