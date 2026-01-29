import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ArrowRight, ArrowLeft, Sparkles, Heart, Users, Flame, Shield, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const questions = [
  {
    id: 'use_type',
    question: "Para quem é a experiência?",
    options: [
      { value: 'solo', label: 'Para Mim', icon: Heart, description: 'Prazer individual e autoconhecimento' },
      { value: 'couples', label: 'Para Casal', icon: Users, description: 'Experiências compartilhadas' },
      { value: 'both', label: 'Ambos', icon: Sparkles, description: 'Flexibilidade total' }
    ]
  },
  {
    id: 'experience',
    question: "Qual seu nível de experiência?",
    options: [
      { value: 'curious', label: 'Curioso(a)', icon: Sparkles, description: 'Primeira vez explorando' },
      { value: 'beginner', label: 'Iniciante', icon: Heart, description: 'Algumas experiências' },
      { value: 'experienced', label: 'Experiente', icon: Flame, description: 'Conheço bem minhas preferências' },
      { value: 'adventurous', label: 'Aventureiro(a)', icon: Shield, description: 'Aberto a novas descobertas' }
    ]
  },
  {
    id: 'interest',
    question: "O que mais te interessa?",
    options: [
      { value: 'pleasure', label: 'Prazer Intenso', icon: Flame, description: 'Sensações estimulantes' },
      { value: 'wellness', label: 'Bem-estar', icon: Heart, description: 'Saúde íntima e cuidados' },
      { value: 'connection', label: 'Conexão', icon: Users, description: 'Intimidade e proximidade' },
      { value: 'exploration', label: 'Exploração', icon: Sparkles, description: 'Novas experiências' }
    ]
  },
  {
    id: 'budget',
    question: "Qual seu orçamento?",
    options: [
      { value: 'budget', label: 'Até R$100', icon: null, description: 'Opções acessíveis' },
      { value: 'mid', label: 'R$100 - R$250', icon: null, description: 'Boa relação custo-benefício' },
      { value: 'premium', label: 'R$250 - R$500', icon: null, description: 'Produtos premium' },
      { value: 'luxury', label: 'Acima de R$500', icon: null, description: 'Experiência de luxo' }
    ]
  }
];

const recommendations = {
  'solo-curious-pleasure-budget': [
    { name: 'Mini Vibrador Discreto', price: 79.90, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200' },
    { name: 'Gel Estimulante Suave', price: 39.90, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200' }
  ],
  'couples-beginner-connection-mid': [
    { name: 'Kit Massagem Sensual', price: 189.90, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200' },
    { name: 'Anel Vibratório Para Casais', price: 159.90, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200' }
  ],
  'default': [
    { name: 'Vibrador Premium Silicone', price: 299.90, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200' },
    { name: 'Óleo de Massagem Premium', price: 89.90, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200' },
    { name: 'Gel Estimulante Natural', price: 69.90, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200' }
  ]
};

export default function AIAssistant() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetAssistant = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendations = () => {
    const key = `${answers.use_type}-${answers.experience}-${answers.interest}-${answers.budget}`;
    return recommendations[key] || recommendations.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 mb-6 shadow-xl">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Assistente{' '}
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              IntimacyAI
            </span>
          </h1>
          <p className="text-gray-600">
            Responda algumas perguntas e encontraremos os produtos perfeitos para você
          </p>
        </motion.div>

        {!showResults ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Pergunta {currentStep + 1} de {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
                  {questions[currentStep].question}
                </h2>

                <div className="grid gap-4">
                  {questions[currentStep].options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                        answers[questions[currentStep].id] === option.value
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-100 hover:border-rose-200 hover:bg-rose-50/50'
                      }`}
                    >
                      {option.icon && (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          answers[questions[currentStep].id] === option.value
                            ? 'bg-gradient-to-br from-rose-400 to-purple-500 text-white'
                            : 'bg-rose-100 text-rose-600'
                        }`}>
                          <option.icon className="w-6 h-6" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{option.label}</p>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                      {answers[questions[currentStep].id] === option.value && (
                        <CheckCircle2 className="w-6 h-6 text-rose-500" />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="ghost"
                    onClick={goBack}
                    disabled={currentStep === 0}
                    className="text-gray-500"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <div className="flex gap-1">
                    {questions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx <= currentStep ? 'bg-rose-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-4"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Suas Recomendações Personalizadas
              </h2>
              <p className="text-gray-600">
                Com base nas suas respostas, selecionamos estes produtos especialmente para você
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {getRecommendations().map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-rose-50 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-rose-600 font-bold">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600 rounded-full">
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={resetAssistant}
                variant="outline"
                className="flex-1 rounded-full border-rose-200 text-rose-600 hover:bg-rose-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Refazer Questionário
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 rounded-full">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Adicionar Todos ao Carrinho
              </Button>
            </div>
          </motion.div>
        )}

        {/* Privacy Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          <Shield className="w-4 h-4 inline mr-1" />
          Suas respostas são 100% confidenciais e não são armazenadas
        </motion.p>
      </div>
    </div>
  );
}