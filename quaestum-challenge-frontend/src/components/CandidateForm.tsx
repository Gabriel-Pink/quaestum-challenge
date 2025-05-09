import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { candidateSchema, CandidateFormData } from '../types/Candidate'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { InputField } from './form/InputField'
import { CheckboxGroup } from './form/CheckboxGroup'
import { useAuth } from '../contexts/AuthContext'
import { LoadingPage } from './LoadingPage'

const skillOptions = [
  'Java', 'Node.js', 'C++', 'PHP', 'Python', 'Go', 'ADVPL',
  'Angular', 'Electron', 'React', 'React Native', 'MongoDB',
  'MySQL', 'SQLServer', 'Postgres', 'Backend', 'Front-End'
]

export function CandidateForm() {

  const { signUpJobApplication, isLoading } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      skills: [],
      educations: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations'
  });

  const cep = watch('cep');

  useEffect(() => {
    const fetchAddress = async () => {
      if (cep && cep.length === 8) {
        try {
          const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (res.data.logradouro) {
            setValue('address', res.data.logradouro);
          }
        } catch (err) {
          console.error('Erro ao buscar endereço:', err);
        }
      }
    }
    fetchAddress();
  }, [cep, setValue]);

  const onSubmit = async (data: CandidateFormData) => {

    try {
      await signUpJobApplication({
        address: data.address,
        birthDate: data.birthDate,
        email: data.email,
        name: data.name,
        phone: data.phone,
        skills: data.skills,
        educations: data.educations.map(education => ({
          courseName: education.courseName,
          institutionName: education.institution,
          graduationDate: String(education.graduationDate)
        })),
        zipCode: data.cep,
      });
    } catch (error: any) {
      setError(error.message);
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {isLoading && <LoadingPage />}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Nome" {...register('name')} error={errors.name} />
        <InputField label="Data de Nascimento" type="date" {...register('birthDate')} error={errors.birthDate} />
        <InputField label="E-mail" type="email" {...register('email')} error={errors.email} />
        <InputField label="Telefone" {...register('phone')} error={errors.phone} />
        <InputField label="CEP" {...register('cep')} error={errors.cep} />
        <InputField label="Endereço" {...register('address')} error={errors.address} readOnly />
      </div>

      <CheckboxGroup
        label="Habilidades"
        name="skills"
        options={skillOptions}
        register={register}
        error={errors.skills}
      />

      <fieldset className="space-y-4">
        <legend className="text-sm font-medium text-gray-700">Formações</legend>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-300 p-4 rounded-xl space-y-4 relative"
          >
            <InputField
              label="Curso"
              {...register(`educations.${index}.courseName`)}
              error={errors.educations?.[index]?.courseName}
            />
            <InputField
              label="Instituição"
              {...register(`educations.${index}.institution`)}
              error={errors.educations?.[index]?.institution}
            />
            <InputField
              label="Data de Conclusão"
              type="date"
              {...register(`educations.${index}.graduationDate`)}
              error={errors.educations?.[index]?.graduationDate}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:underline text-sm"
            >
              Remover
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({ courseName: '', institution: '', graduationDate: '' })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Adicionar Formação
        </button>
      </fieldset>

      <div className="text-center">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
