"use client";

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';

function AddNewStudent({ refreshData }) {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then(resp=> {
      console.log(resp.data);
      setGrades(resp.data);
    });
  };

  const onSubmit = (data) => {
    setLoading(true);
    GlobalApi.CreateNewStudent(data).then((resp) => {
      if (resp.data) {
        setOpen(false);
        refreshData();
        reset();
        toast('Student has been added 🎉');
      }
      setLoading(false);
    });
  };

  return (
    <div>
      {/* Add right-to-left gradient for this button */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        👆🏻 Onboard New Student
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Onboard New Student 💤</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Form Inputs */}
                <div className="py-3">
                  <label className="mb-2 block">Full Name</label>
                  <Input
                    className="focus:!outline-none focus:!ring-0 text-black"
                    placeholder="Ankush Shah"
                    {...register('name', { required: true })}
                  />
                </div>
                <div className="py-3 flex flex-col">
                  <label className="mb-2 block">Select Grade</label>
                  <select
                    className="p-3 border rounded-lg bg-white text-black focus:!outline-none focus:!ring-0"
                    {...register('grade', { required: true })}>
                      {grades.map((item, index) => (
                      <option key={index} value={item.grade}>
                        {item.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-3">
                  <label className="mb-2 block">Section and Stream</label>
                  <Input
                    className="focus:!outline-none focus:!ring-0 text-black"
                    placeholder="A - Non Medical"
                    {...register('sectionandstream', { required: true })}
                  />
                </div>
                <div className="py-3">
                  <label className="mb-2 block">Roll Number</label>
                  <Input
                    type="number"
                    className="focus:!outline-none focus:!ring-0 text-black"
                    placeholder="12"
                    {...register('rollnumber', { required: true })}
                  />
                </div>
                <div className="py-3">
                  <label className="mb-2 block">Contact Number</label>
                  <Input
                    type="number"
                    className="focus:!outline-none focus:!ring-0 text-black"
                    placeholder="9876543210"
                    {...register('contact', { required: true })}
                  />
                </div>
                <div className="py-3">
                  <label className="mb-2 block">Address</label>
                  <Input
                    className="focus:!outline-none focus:!ring-0 text-black"
                    placeholder="DLF Phase - IV, Chakkarpur - Maruti Vihar"
                    {...register('address', { required: true })}
                  />
                </div>

                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="bg-slate-100 text-color hover:bg-slate-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    {loading ? <LoaderIcon className="animate-spin" /> : 'Save'}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
