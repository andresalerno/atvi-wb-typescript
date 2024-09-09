/**
 * Classe abstrata que define uma interface para operações de listagem.
 * As subclasses devem fornecer uma implementação concreta para o método listar.
 */

export default abstract class Listagem {

    /**
     * Método abstrato que deve ser implementado pelas subclasses.
     * A implementação concreta deste método deve realizar a operação de listagem.
     */

    public abstract listar(): void
}