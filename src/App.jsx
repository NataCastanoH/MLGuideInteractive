import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight, Filter, Book, Zap, Target, CheckSquare } from 'lucide-react';

const MLGuideApp = () => {
  const [activeSection, setActiveSection] = useState('decision-tree');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStep, setCurrentStep] = useState('start');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [expandedSections, setExpandedSections] = useState({});

  // Decision Tree Data
  const decisionTree = {
    start: {
      question: "¿Tienes datos etiquetados?",
      description: "¿Conoces el resultado esperado para tus datos históricos?",
      options: [
        { label: "✅ Sí, tengo labels", next: "supervised", color: "emerald" },
        { label: "❌ No tengo labels", next: "unsupervised", color: "amber" }
      ]
    },
    supervised: {
      question: "¿Qué tipo de variable quieres predecir?",
      description: "Selecciona el tipo de salida de tu modelo",
      options: [
        { label: "📊 Categoría (Clasificación)", next: "classification", color: "blue" },
        { label: "📈 Número continuo (Regresión)", next: "regression", color: "purple" },
        { label: "⏰ Serie temporal", next: "timeseries", color: "orange" }
      ]
    },
    unsupervised: {
      question: "¿Cuál es tu objetivo?",
      description: "¿Qué quieres descubrir en tus datos?",
      options: [
        { label: "👥 Agrupar similares (Clustering)", next: "clustering", color: "pink" },
        { label: "📉 Reducir dimensiones", next: "dimensionality", color: "cyan" },
        { label: "🎯 Recomendar items", next: "recommendation", color: "indigo" }
      ]
    },
    classification: {
      question: "¿Cuál es tu prioridad principal?",
      description: "Esto determinará el mejor modelo para ti",
      options: [
        { label: "🔍 Interpretabilidad máxima", result: "logistic", color: "emerald" },
        { label: "🏆 Performance máximo", result: "xgboost", color: "red" },
        { label: "🎲 Probabilidades calibradas", result: "calibrated", color: "blue" }
      ]
    },
    regression: {
      question: "¿Qué tipo de relación esperas?",
      options: [
        { label: "📏 Relación lineal", result: "linear_reg", color: "blue" },
        { label: "🌳 Relación no lineal", result: "tree_reg", color: "green" }
      ]
    },
    timeseries: {
      question: "¿Cuántas variables predices?",
      options: [
        { label: "1️⃣ Una variable (Univariada)", result: "arima", color: "orange" },
        { label: "🔢 Múltiples variables", result: "ml_ts", color: "purple" }
      ]
    },
    clustering: {
      question: "¿Conoces el número de grupos?",
      options: [
        { label: "✅ Sí, sé cuántos grupos", result: "kmeans", color: "pink" },
        { label: "❓ No, quiero descubrirlos", result: "dbscan", color: "cyan" }
      ]
    },
    dimensionality: {
      question: "¿Tipo de reducción?",
      options: [
        { label: "📊 Para visualización", result: "tsne", color: "purple" },
        { label: "🔧 Para preprocesamiento", result: "pca", color: "blue" }
      ]
    },
    recommendation: {
      question: "¿Qué tipo de datos tienes?",
      options: [
        { label: "⭐ Ratings/Interacciones", result: "collab", color: "yellow" },
        { label: "📝 Descripciones de items", result: "content", color: "green" }
      ]
    }
  };

  const modelResults = {
    logistic: {
      name: "Regresión Logística",
      description: "Modelo lineal interpretable para clasificación",
      pros: ["Muy interpretable", "Rápido", "Probabilidades calibradas"],
      cons: ["Solo relaciones lineales", "Performance limitado"],
      useWhen: "Necesitas explicar cada decisión o cumplir regulaciones",
      code: "from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()"
    },
    xgboost: {
      name: "XGBoost / LightGBM",
      description: "Gradient boosting para máximo performance",
      pros: ["Mejor accuracy", "Maneja missing values", "Feature importance"],
      cons: ["Requiere tuning", "Menos interpretable"],
      useWhen: "Performance es crítico y tienes tiempo para tunear",
      code: "from lightgbm import LGBMClassifier\nmodel = LGBMClassifier()"
    },
    calibrated: {
      name: "Modelo Calibrado",
      description: "Logística + calibración para probabilidades precisas",
      pros: ["Probabilidades confiables", "Útil para decisiones por umbral"],
      cons: ["Paso adicional", "Requiere validación cuidadosa"],
      useWhen: "Necesitas P(y=1) precisa para tomar decisiones",
      code: "from sklearn.calibration import CalibratedClassifierCV"
    },
    linear_reg: {
      name: "Regresión Lineal / Ridge / Lasso",
      description: "Modelo lineal con regularización opcional",
      pros: ["Simple", "Muy interpretable", "Rápido"],
      cons: ["Solo relaciones lineales"],
      useWhen: "Relación aproximadamente lineal y necesitas interpretabilidad",
      code: "from sklearn.linear_model import Ridge\nmodel = Ridge(alpha=1.0)"
    },
    tree_reg: {
      name: "Random Forest / XGBoost",
      description: "Árboles ensemble para relaciones complejas",
      pros: ["Captura no linealidad", "Robusto", "Buen performance"],
      cons: ["Menos interpretable que lineal"],
      useWhen: "Relaciones complejas y no linealidad",
      code: "from sklearn.ensemble import RandomForestRegressor"
    },
    arima: {
      name: "ARIMA / Prophet",
      description: "Modelos estadísticos para series temporales",
      pros: ["Captura estacionalidad", "Intervalos de confianza", "Interpretable"],
      cons: ["Univariada", "Asume linealidad"],
      useWhen: "Serie con estacionalidad clara y una variable",
      code: "from prophet import Prophet\nmodel = Prophet()"
    },
    ml_ts: {
      name: "XGBoost / LSTM para Time Series",
      description: "ML para múltiples series o features exógenas",
      pros: ["Múltiples variables", "No lineal", "Features exógenas"],
      cons: ["Requiere feature engineering"],
      useWhen: "Múltiples series o necesitas incluir variables externas",
      code: "# XGBoost con lags y rolling features"
    },
    kmeans: {
      name: "K-Means",
      description: "Clustering por centroides",
      pros: ["Simple", "Rápido", "Fácil de entender"],
      cons: ["Requiere conocer K", "Solo clusters esféricos"],
      useWhen: "Sabes número de grupos y son compactos",
      code: "from sklearn.cluster import KMeans\nmodel = KMeans(n_clusters=5)"
    },
    dbscan: {
      name: "DBSCAN",
      description: "Clustering por densidad",
      pros: ["No requiere K", "Detecta outliers", "Formas irregulares"],
      cons: ["Sensible a parámetros", "Lento en datos grandes"],
      useWhen: "No sabes K o tienes outliers importantes",
      code: "from sklearn.cluster import DBSCAN\nmodel = DBSCAN(eps=0.5)"
    },
    tsne: {
      name: "t-SNE / UMAP",
      description: "Reducción no lineal para visualización",
      pros: ["Visualización 2D/3D", "Captura estructura no lineal"],
      cons: ["No generaliza a datos nuevos", "Lento"],
      useWhen: "Solo necesitas visualizar, no predecir",
      code: "from sklearn.manifold import TSNE\ntsne = TSNE(n_components=2)"
    },
    pca: {
      name: "PCA",
      description: "Análisis de componentes principales",
      pros: ["Lineal", "Generaliza", "Reduce ruido"],
      cons: ["Solo lineal", "Componentes difíciles de interpretar"],
      useWhen: "Preprocesamiento o reducción de dimensiones para otros modelos",
      code: "from sklearn.decomposition import PCA\npca = PCA(n_components=10)"
    },
    collab: {
      name: "Collaborative Filtering",
      description: "Recomendación basada en similitud de usuarios/items",
      pros: ["No requiere features", "Captura preferencias colectivas"],
      cons: ["Cold start problem", "Sparsity"],
      useWhen: "Tienes matriz de interacciones usuario-item",
      code: "from implicit.als import AlternatingLeastSquares"
    },
    content: {
      name: "Content-Based Filtering",
      description: "Recomendación por similitud de contenido",
      pros: ["No cold start", "Explica por qué recomienda"],
      cons: ["Requiere features de items", "Filtro burbuja"],
      useWhen: "Tienes descripciones/features de items",
      code: "from sklearn.metrics.pairwise import cosine_similarity"
    }
  };

  // Industry Use Cases
  const industryCases = [
    {
      industry: "Retail",
      problem: "Predicción de Churn",
      type: "Clasificación",
      model: "LightGBM / XGBoost",
      input: "RFM, comportamiento, demográficos",
      output: "Prob. abandono 3 meses",
      metric: "PR-AUC, Lift"
    },
    {
      industry: "Retail",
      problem: "Predicción de Demanda",
      type: "Regresión (TS)",
      model: "Prophet / LSTM / XGBoost",
      input: "Historial ventas, promos, festivos",
      output: "Ventas próximas 4 semanas",
      metric: "MAPE, RMSE"
    },
    {
      industry: "Retail",
      problem: "Segmentación Clientes",
      type: "Clustering",
      model: "K-Means en RFM",
      input: "Recencia, Frecuencia, Monetary",
      output: "4-6 segmentos",
      metric: "Silhouette, Business validation"
    },
    {
      industry: "Manufactura",
      problem: "Mantenimiento Predictivo",
      type: "Clasificación (TS)",
      model: "LSTM / XGBoost",
      input: "Sensores (temp, vibración, presión)",
      output: "Falla en N días",
      metric: "Precision, Recall"
    },
    {
      industry: "Manufactura",
      problem: "Control Calidad Visual",
      type: "Deep Learning",
      model: "CNN / ResNet",
      input: "Imágenes producto",
      output: "Defecto Sí/No + tipo",
      metric: "Accuracy >99%, F1"
    },
    {
      industry: "Finanzas",
      problem: "Credit Scoring",
      type: "Clasificación",
      model: "Logística (regulada) / XGBoost",
      input: "Historial crediticio, ingresos",
      output: "Prob. default, score",
      metric: "AUC, KS statistic"
    },
    {
      industry: "Finanzas",
      problem: "Detección Fraude",
      type: "Clasificación",
      model: "Isolation Forest / GNN",
      input: "Transacción, red relaciones",
      output: "Fraude Sí/No",
      metric: "Precision@K, Recall"
    },
    {
      industry: "Marketing",
      problem: "Segmentación Audiencias",
      type: "Clustering",
      model: "K-Means / Hierarchical",
      input: "RFM, comportamiento, demografía",
      output: "Segmentos accionables",
      metric: "Business KPIs"
    }
  ];

  // Filter cases
  const filteredCases = useMemo(() => {
    let filtered = industryCases;
    
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(c => c.industry === selectedIndustry);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedIndustry, searchQuery]);

  const industries = ['all', ...new Set(industryCases.map(c => c.industry))];

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetDecisionTree = () => {
    setCurrentStep('start');
  };

  const renderDecisionTree = () => {
    const step = decisionTree[currentStep];
    
    if (!step) {
      // Show result
      const result = modelResults[currentStep];
      if (!result) return null;
      
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-3xl font-bold text-emerald-900 mb-2">{result.name}</h3>
                <p className="text-lg text-emerald-700">{result.description}</p>
              </div>
              <button
                onClick={resetDecisionTree}
                className="px-4 py-2 bg-white border-2 border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
              >
                🔄 Reiniciar
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-xl p-6 border-2 border-emerald-200">
                <h4 className="font-bold text-emerald-900 mb-3 text-lg">✅ Ventajas</h4>
                <ul className="space-y-2">
                  {result.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-emerald-800">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-rose-200">
                <h4 className="font-bold text-rose-900 mb-3 text-lg">⚠️ Desventajas</h4>
                <ul className="space-y-2">
                  {result.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-rose-800">
                      <span className="text-rose-500 mt-1">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-6 border-2 border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 text-lg">🎯 Cuándo usar</h4>
              <p className="text-blue-800 text-lg">{result.useWhen}</p>
            </div>

            <div className="mt-6 bg-slate-900 rounded-xl p-6 border-2 border-slate-700">
              <h4 className="font-bold text-slate-100 mb-3 text-lg flex items-center gap-2">
                <Zap size={20} className="text-yellow-400" />
                Código de ejemplo
              </h4>
              <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
                {result.code}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-white border-2 border-slate-300 rounded-2xl p-8 shadow-lg">
          <div className="mb-6">
            {currentStep !== 'start' && (
              <button
                onClick={() => {
                  // Find parent step
                  const parent = Object.entries(decisionTree).find(([key, value]) => 
                    value.options?.some(opt => opt.next === currentStep || opt.result === currentStep)
                  );
                  if (parent) {
                    setCurrentStep(parent[0]);
                  } else {
                    resetDecisionTree();
                  }
                }}
                className="text-slate-600 hover:text-slate-900 font-medium mb-4 inline-flex items-center gap-2"
              >
                ← Volver
              </button>
            )}
            <h3 className="text-3xl font-bold text-slate-900 mb-3">{step.question}</h3>
            {step.description && (
              <p className="text-lg text-slate-600">{step.description}</p>
            )}
          </div>

          <div className="grid gap-4">
            {step.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(option.next || option.result)}
                className={`group relative p-6 bg-gradient-to-r from-${option.color}-50 to-${option.color}-100 border-2 border-${option.color}-300 rounded-xl hover:border-${option.color}-500 transition-all text-left hover:shadow-lg transform hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">{option.label}</span>
                  <ChevronRight className="text-slate-400 group-hover:text-slate-700 transition-colors" size={24} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetDecisionTree}
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
          >
            🔄 Reiniciar desde el inicio
          </button>
        </div>
      </div>
    );
  };

  const sections = [
    { id: 'decision-tree', label: '🌳 Árbol de Decisión', icon: Target },
    { id: 'industry-cases', label: '🏭 Casos por Industria', icon: Book },
    { id: 'quick-tips', label: '⚡ Tips Rápidos', icon: Zap },
    { id: 'checklist', label: '✅ Checklist', icon: CheckSquare }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl sticky top-0 z-50 border-b-4 border-cyan-400">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">
                ML Guide <span className="text-cyan-400">Interactive</span>
              </h1>
              <p className="text-slate-300 text-lg font-medium">Guía rápida de consulta para Ciencia de Datos</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="px-4 py-2 bg-cyan-500 bg-opacity-20 border border-cyan-400 rounded-lg">
                <span className="text-cyan-300 font-bold text-sm">v1.0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-2">
              <h2 className="font-black text-slate-700 mb-4 text-sm uppercase tracking-wider">Navegación</h2>
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Decision Tree Section */}
            {activeSection === 'decision-tree' && (
              <section className="animate-fade-in">
                <div className="mb-6">
                  <h2 className="text-4xl font-black text-slate-900 mb-3">🌳 Árbol de Decisión Interactivo</h2>
                  <p className="text-xl text-slate-600">
                    Responde las preguntas para encontrar el modelo perfecto para tu problema
                  </p>
                </div>
                {renderDecisionTree()}
              </section>
            )}

            {/* Industry Cases Section */}
            {activeSection === 'industry-cases' && (
              <section className="animate-fade-in">
                <div className="mb-6">
                  <h2 className="text-4xl font-black text-slate-900 mb-3">🏭 Casos de Uso por Industria</h2>
                  <p className="text-xl text-slate-600 mb-6">
                    Explora problemas reales y los modelos recomendados
                  </p>

                  {/* Filters */}
                  <div className="bg-white rounded-xl p-6 border-2 border-slate-300 mb-6 shadow-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          placeholder="Buscar por problema o modelo..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none font-medium"
                        />
                      </div>

                      <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <select
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none font-medium appearance-none bg-white"
                        >
                          {industries.map(ind => (
                            <option key={ind} value={ind}>
                              {ind === 'all' ? 'Todas las industrias' : ind}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-4">
                    {filteredCases.map((case_, idx) => (
                      <div
                        key={idx}
                        className="bg-white border-2 border-slate-300 rounded-xl p-6 hover:shadow-xl transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                                {case_.industry}
                              </span>
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-bold">
                                {case_.type}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">{case_.problem}</h3>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-bold text-slate-500 mb-1">🤖 Modelo</p>
                            <p className="text-lg font-bold text-slate-900">{case_.model}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-500 mb-1">📊 Métrica</p>
                            <p className="text-lg font-bold text-slate-900">{case_.metric}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-500 mb-1">📥 Input</p>
                            <p className="text-slate-700">{case_.input}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-500 mb-1">📤 Output</p>
                            <p className="text-slate-700">{case_.output}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredCases.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border-2 border-slate-300">
                      <p className="text-xl text-slate-500">No se encontraron casos que coincidan con tu búsqueda</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Quick Tips Section */}
            {activeSection === 'quick-tips' && (
              <section className="animate-fade-in space-y-6">
                <div className="mb-6">
                  <h2 className="text-4xl font-black text-slate-900 mb-3">⚡ Tips Rápidos</h2>
                  <p className="text-xl text-slate-600">
                    Principios fundamentales para proyectos exitosos
                  </p>
                </div>

                {[
                  {
                    title: "🎯 Simple Primero",
                    tips: [
                      "Regresión Logística antes de Neural Network",
                      "Random Forest antes de XGBoost",
                      "Si simple funciona bien → SHIP IT"
                    ],
                    color: "emerald"
                  },
                  {
                    title: "📊 Conoce tus Restricciones",
                    tips: [
                      "Latencia < 100ms → Modelos ligeros (Logística, árboles shallow)",
                      "Interpretabilidad requerida → Logística, Árboles, Linear",
                      "Datos limitados → Transfer learning, few-shot, Bayesian"
                    ],
                    color: "blue"
                  },
                  {
                    title: "💰 Métrica de Negocio > Métrica Técnica",
                    tips: [
                      "AUC 0.95 pero no útil → MALO",
                      "AUC 0.80 pero genera $1M → BUENO",
                      "Optimiza por impacto, no por métrica aislada"
                    ],
                    color: "purple"
                  },
                  {
                    title: "🔧 Data Quality > Model Complexity",
                    tips: [
                      "Garbage in, garbage out",
                      "Invierte en entender y limpiar datos",
                      "Feature engineering > hiperparameter tuning"
                    ],
                    color: "orange"
                  },
                  {
                    title: "🚀 Deploy > Perfect",
                    tips: [
                      "Modelo en producción aprendiendo > Modelo perfecto en notebook",
                      "Iterar rápido en producción",
                      "Monitor everything: drift, performance, latency"
                    ],
                    color: "pink"
                  }
                ].map((section, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br from-${section.color}-50 to-${section.color}-100 border-2 border-${section.color}-300 rounded-xl p-6 shadow-lg`}
                  >
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.tips.map((tip, tidx) => (
                        <li key={tidx} className="flex items-start gap-3">
                          <span className={`text-${section.color}-600 font-bold text-xl`}>•</span>
                          <span className="text-slate-800 text-lg">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* Checklist Section */}
            {activeSection === 'checklist' && (
              <section className="animate-fade-in space-y-6">
                <div className="mb-6">
                  <h2 className="text-4xl font-black text-slate-900 mb-3">✅ Checklist de Proyecto</h2>
                  <p className="text-xl text-slate-600">
                    Asegúrate de no olvidar ningún paso crítico
                  </p>
                </div>

                {[
                  {
                    phase: "1. Definición del Problema",
                    items: [
                      "¿Qué decisión se tomará con este modelo?",
                      "¿Quién la tomará y con qué frecuencia?",
                      "Métrica de éxito de negocio clara",
                      "Restricciones: latencia, interpretabilidad, presupuesto",
                      "Baseline definido"
                    ],
                    color: "blue"
                  },
                  {
                    phase: "2. Auditoría de Datos",
                    items: [
                      "Tamaño suficiente (>10k ideal)",
                      "% de nulos por variable",
                      "Duplicados identificados",
                      "Outliers analizados",
                      "Leakage check realizado"
                    ],
                    color: "emerald"
                  },
                  {
                    phase: "3. Feature Engineering",
                    items: [
                      "Features temporales (lags, rolling)",
                      "Features categóricas codificadas",
                      "Interacciones creadas",
                      "Multicolinealidad checkeada",
                      "Features validadas con experto de negocio"
                    ],
                    color: "purple"
                  },
                  {
                    phase: "4. Desarrollo del Modelo",
                    items: [
                      "Baseline simple implementado",
                      "3+ modelos comparados",
                      "Hiperparámetros tuneados",
                      "Validación cruzada aplicada",
                      "Performance en test > baseline"
                    ],
                    color: "orange"
                  },
                  {
                    phase: "5. Deployment",
                    items: [
                      "API implementada y testeada",
                      "Latencia medida y cumple requisito",
                      "Docker/container creado",
                      "Monitoring configurado",
                      "A/B test diseñado"
                    ],
                    color: "pink"
                  }
                ].map((phase, idx) => (
                  <div key={idx} className="bg-white border-2 border-slate-300 rounded-xl overflow-hidden shadow-lg">
                    <button
                      onClick={() => toggleSection(`checklist-${idx}`)}
                      className={`w-full p-6 text-left bg-gradient-to-r from-${phase.color}-50 to-${phase.color}-100 border-b-2 border-${phase.color}-200 hover:from-${phase.color}-100 hover:to-${phase.color}-200 transition-colors`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-slate-900">{phase.phase}</h3>
                        {expandedSections[`checklist-${idx}`] ? (
                          <ChevronDown className="text-slate-600" size={24} />
                        ) : (
                          <ChevronRight className="text-slate-600" size={24} />
                        )}
                      </div>
                    </button>
                    
                    {expandedSections[`checklist-${idx}`] && (
                      <div className="p-6 space-y-3">
                        {phase.items.map((item, iidx) => (
                          <label key={iidx} className="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              className="mt-1 w-5 h-5 rounded border-2 border-slate-400 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-slate-700 text-lg">{item}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 mt-16 py-8 border-t-4 border-cyan-400">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg font-medium">
            ML Guide Interactive • Versión 1.0 • Febrero 2026
          </p>
          <p className="mt-2 text-slate-500">
            Guía de consulta rápida para Ciencia de Datos
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MLGuideApp;
