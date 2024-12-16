import React, { Component } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((paramValue) =>
        paramValue.paramId === paramId
          ? { ...paramValue, value }
          : paramValue
      ),
    }));
  };

  public getModel(): Model {
    return {
      ...this.props.model,
      paramValues: this.state.paramValues,
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        <h3>Редактор параметров</h3>
        <form>
          {params.map((param) => {
            const paramValue = paramValues.find(
              (value) => value.paramId === param.id
            )?.value || '';

            return (
              <div key={param.id} style={{ marginBottom: '10px' }}>
                <label>
                  {param.name}:
                  <input
                    type="text"
                    value={paramValue}
                    onChange={(e) =>
                      this.handleParamChange(param.id, e.target.value)
                    }
                    style={{ marginLeft: '10px' }}
                  />
                </label>
              </div>
            );
          })}
        </form>
        <button
          onClick={() => console.log(this.getModel())}
          style={{ marginTop: '20px', padding: '5px 10px' }}
        >
          Показать модель
        </button>
      </div>
    );
  }
}

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
  colors: ['red', 'blue'],
};

export default function App() {
  return <ParamEditor params={params} model={model} />;
}
