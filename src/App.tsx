import { useState } from 'react';
import { useBudget, LIMITS } from './hooks/useBudget';
import { ProgressRing } from './components/ProgressRing';
import { InputField } from './components/InputField';
import { ProgressBar } from './components/ProgressBar';
import { Section } from './components/Section';
import { SummaryCard } from './components/SummaryCard';

function App() {
  const { data, calculations, updateField, updateCheck, resetData, shareReport } = useBudget();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">💰 Семейный бюджет</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Правило 50/50</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={shareReport}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
              title="Поделиться отчетом"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl transition-colors"
              title="Сбросить данные"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Progress Ring */}
        <div className="flex justify-center py-4">
          <ProgressRing
            percent={calculations.percent}
            balance={calculations.balance}
            daily={calculations.daily}
          />
        </div>

        {/* Summary Cards */}
        <SummaryCard calculations={calculations} income={data.income} />

        {/* Income Section */}
        <Section title="Доходы" icon="💵" defaultOpen={true}>
          <InputField
            label="Зарплата"
            value={data.income}
            dataKey="income"
            onChange={updateField}
            icon="💳"
          />
          <InputField
            label="Алименты (получаем)"
            value={data.alimony}
            dataKey="alimony"
            onChange={updateField}
            icon="👶"
            hint="Вычитается из ипотеки"
          />
          <InputField
            label="От бабушки/дедушки"
            value={data.grand}
            dataKey="grand"
            onChange={updateField}
            icon="👴"
            hint="Вычитается из хобби"
          />
        </Section>

        {/* Fixed Expenses */}
        <Section title="Обязательные платежи" icon="🏠" badge={`${Math.round(calculations.mortNet + data.carloan).toLocaleString('ru-RU')} ₽`}>
          <InputField
            label="Ипотека"
            value={data.mortgage}
            dataKey="mortgage"
            onChange={updateField}
            icon="🏠"
            checked={data.checks['mortgage']}
            onCheck={updateCheck}
            hint={`Чистая: ${calculations.mortNet.toLocaleString('ru-RU')} ₽`}
          />
          <InputField
            label="Автокредит"
            value={data.carloan}
            dataKey="carloan"
            onChange={updateField}
            icon="🚗"
            checked={data.checks['carloan']}
            onCheck={updateCheck}
          />
        </Section>

        {/* Limits Section */}
        <Section title="Лимиты" icon="📊" defaultOpen={true}>
          <ProgressBar
            label="Продукты"
            value={data.food}
            limit={LIMITS.food}
            icon="🛒"
          />
          <InputField
            label="Потрачено на продукты"
            value={data.food}
            dataKey="food"
            onChange={updateField}
            icon="🛒"
          />
          
          <div className="my-4" />
          
          <ProgressBar
            label="Бензин"
            value={data.gas}
            limit={LIMITS.gas}
            icon="⛽"
          />
          <InputField
            label="Потрачено на бензин"
            value={data.gas}
            dataKey="gas"
            onChange={updateField}
            icon="⛽"
          />
        </Section>

        {/* Variable Expenses */}
        <Section title="Переменные расходы" icon="🎯" badge={`${Math.round(data.cat + calculations.hobbNet).toLocaleString('ru-RU')} ₽`}>
          <InputField
            label="Кот"
            value={data.cat}
            dataKey="cat"
            onChange={updateField}
            icon="🐱"
            checked={data.checks['cat']}
            onCheck={updateCheck}
          />
          <InputField
            label="Хобби / Кружки"
            value={data.hobb}
            dataKey="hobb"
            onChange={updateField}
            icon="🎨"
            checked={data.checks['hobb']}
            onCheck={updateCheck}
            hint={`Чистая: ${calculations.hobbNet.toLocaleString('ru-RU')} ₽`}
          />
        </Section>

        {/* Phone Bills */}
        <Section 
          title="Телефоны" 
          icon="📱" 
          defaultOpen={false}
          badge={`${Math.round(data.phone.anya + data.phone.misha + data.phone.mira).toLocaleString('ru-RU')} ₽`}
        >
          <InputField
            label="Телефон Ани"
            value={data.phone.anya}
            dataKey="phone.anya"
            onChange={updateField}
            icon="👩"
            checked={data.checks['phone.anya']}
            onCheck={updateCheck}
          />
          <InputField
            label="Телефон Миши"
            value={data.phone.misha}
            dataKey="phone.misha"
            onChange={updateField}
            icon="👨"
            checked={data.checks['phone.misha']}
            onCheck={updateCheck}
          />
          <InputField
            label="Телефон Миры"
            value={data.phone.mira}
            dataKey="phone.mira"
            onChange={updateField}
            icon="👧"
            checked={data.checks['phone.mira']}
            onCheck={updateCheck}
          />
        </Section>

        {/* Subscriptions */}
        <Section 
          title="Подписки" 
          icon="📺" 
          defaultOpen={false}
          badge={`${Math.round(data.subs.anya + data.subs.misha).toLocaleString('ru-RU')} ₽`}
        >
          <InputField
            label="Подписки Ани"
            value={data.subs.anya}
            dataKey="subs.anya"
            onChange={updateField}
            icon="👩"
            checked={data.checks['subs.anya']}
            onCheck={updateCheck}
          />
          <InputField
            label="Подписки Миши"
            value={data.subs.misha}
            dataKey="subs.misha"
            onChange={updateField}
            icon="👨"
            checked={data.checks['subs.misha']}
            onCheck={updateCheck}
          />
        </Section>

        {/* Notes */}
        <Section title="Заметки" icon="📝" defaultOpen={false}>
          <textarea
            value={data.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="Заметки к бюджету..."
            className="w-full h-32 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800 dark:text-gray-200"
          />
        </Section>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pb-8">
          <p>Правило 50/50: 50% в копилку, 50% на жизнь</p>
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Сбросить все данные?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Это действие нельзя отменить. Все введенные данные будут удалены.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  resetData();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
